import { Options, Vue, Watch } from 'vue-property-decorator';
import { renderLocalVideo, renderRemoteVideo } from '../services/classroom.service';
import { MODE_TYPE, roomButtonsStatus, UserListState, UserType } from '../services/state-manager/classroom-state.service';
import JoinerButtons from "@/components/joiner/JoinerButtons.vue";
@Options({
  components: {
    JoinerButtons
  }
})
export default class joinerMixins extends Vue {
  prefix:string = ''
  get lists() {
    return UserListState.lists;
  }
   get modeType() {
     return roomButtonsStatus.mode
   }
  @Watch('lists', {deep:true})
  onListsChange(newV: UserType[], oldV: UserType[]) {
    if(newV!=oldV) {
      this.initList(this.modeType == MODE_TYPE.FLAT ? this.prefix : 'user_',)
    }
  }

  @Watch('modeType')
  onModeTypeChange(newV:number, oldV:number) {
   if(newV == MODE_TYPE.FLAT) {
     this.initList(this.prefix)
   }
  }
  mounted() {
     this.initList(this.modeType == MODE_TYPE.FLAT ? this.prefix : 'user_');
  }
  initList(mPrefix:string) {
    setTimeout(() => {
      this.lists.forEach( item => {
       if (item.isLocal) {
        renderLocalVideo(`${mPrefix}${item.userId}`);
      } else {
        renderRemoteVideo(`${mPrefix}${item.userId}`, item.userId);
      }
    })
    }, 500);
  }
}
