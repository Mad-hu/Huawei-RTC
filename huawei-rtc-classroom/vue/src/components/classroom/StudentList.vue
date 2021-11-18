<!--
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-08-04 15:35:56
 * @LastEditTime: 2021-09-29 18:13:30
 * @LastEditors: Yandong Hu
 * @Description:
-->
<template>
  <div class="stu-lists" ref="stuList">
    <div class="stu-list-btn">
      <el-button type="primary" circle  @click="prePage" v-show="pageNum!=0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"></path></svg>
      </el-button>
    </div>
    <div class="stu-item" :key="item.userId" v-for="item in userListState" v-show="showUserId.indexOf(item.userId)>-1">
      <div class="stu-render" :id="`user_${item.userId}`" :style="{'border-color':item.focus?'red':''}"></div>
      <div class="close" v-if="item.video == 0 ">已关闭</div>
      <div class="stu-info-con">
        <div class="name">{{ item.userName }}</div>
        <div class="userId">{{ item.userId }}</div>
      </div>
      <div class="user-buttons-box">
        <user-item-buttons :user="item"></user-item-buttons>
      </div>
    </div>
    <div class="stu-list-btn">
      <el-button type="primary" circle  @click="nextPage" v-show="nextPageBtnShow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-394d1fd8=""><path fill="currentColor" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z"></path></svg>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Watch } from "vue-property-decorator";
import { UserListState } from "../../services/state-manager/classroom-state.service";
import { renderRemoteVideo, renderLocalVideo, } from "../../services/classroom.service"
import {
  ON_OFF,
} from "../../services/common/abstract/rtm.abstract";
import { muteRemoteVideoStream } from '../../services/setting/setting-service'
@Options({
  components: {
    
  },
})
export default class StudentList extends Vue {
  userListState = UserListState.lists;
  pageSize:number = 10
  pageNum:number = 0

  mounted() {
    this.initPageSize()
    this.litsenWindow()
  }
  updated() {
    console.log("StudentList updated:!");
  }
  
  //展示画廊模式下的用户列表
  get userList(){
    let userlist = this.userListState.slice(this.pageNum*this.pageSize,this.pageSize*this.pageNum+this.pageSize)
    return userlist
  }
  //展示的用户id
  get showUserId(){
    return this.userList.map(item=>item.userId)
  }
  get nextPageBtnShow(){
    return this.pageNum + 1<(this.userListState.length/this.pageSize)
  }
  @Watch('userList') 
  userListChange(newVal: [],oldVal:any){
    console.log(newVal,oldVal)
    if(newVal&&Array.isArray(newVal)){
      this.$nextTick(()=>{
        newVal.forEach((item:any) => {
          //如果流已经被渲染过了，就不需要在拉了
          let userHasRemoted = oldVal.find((oldItem:any)=>item.userId == oldItem.userId)
          if(!userHasRemoted){
            //拉流
            if (item['isLocal']) {
              //拉本地流 本第流不需要
            } else {
              //拉远端流
              muteRemoteVideoStream(item.userId,false)
            }
          }
        });

        oldVal.forEach((item:any) => {
          let userWillBeRemoted = newVal.find((newItem:any)=>item.userId == newItem.userId)
          if(!userWillBeRemoted){
            if (item['isLocal']) {
              
            } else {
              //断远端流
              console.log(item)
              //如果userid正在被聚焦 就不要断流
              if(!item.focus){
                muteRemoteVideoStream(item.userId, true)
              }
              
            }

          }
        });
      })

    }

  }

  @Watch('userListState',{deep:true})
  userListStateChange(newVal: [],oldVal: []){
    let pagination = this.pageNum+1
    if(Math.ceil(newVal.length/this.pageSize)<pagination&&this.pageNum>0){
      this.pageNum --
    }
  }
  initPageSize(){
      let stuListDom = <HTMLElement>this.$refs['stuList']
      let pageBtnWdith = 60*2
      let userboxWdith = 192 
      let parkNumMin = 1
      let parkNumMax = 9
      let userBoxListWidth = stuListDom.clientWidth - pageBtnWdith
      //可以停放多少个视频窗
      let parkNum = Math.floor(userBoxListWidth/userboxWdith)
      
      if(parkNum>=parkNumMin&&parkNum<=parkNumMax){
        this.pageSize = parkNum
      }
  }
  litsenWindow(){
    window.onresize = ()=>{
      this.initPageSize()
      //例如当userList长度为4 pagenumber为2 pagesize为3 时可以正常展示，当视口变化为pagesize为4时，如果pagenum依然为2，就会导致第二页内容为空 展示为空 
      if(this.pageSize>this.userList.length&&this.pageNum>0){
        this.pageNum--
      }
    }
  }
  prePage(){
    this.pageNum--
  }
  nextPage(){
    this.pageNum++
  }
}
</script>

<style lang="less" scoped>
.stu-lists {
  width: 100%;
  height: 108px;
  border-bottom: 1px solid #fff;
  display: flex;
  justify-content: center;
  overflow: hidden;
  flex-wrap: wrap;
  .stu-list-btn{
    flex-shrink: 0;
    width: 40px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: content-box;
    .el-button.is-circle{
      width: 100%;
      height: 40px;
    }
  }
  .stu-item {
    width: 192px;
    height: 108px;
    position: relative;
    .user-buttons-box{
      position: absolute;
      right: 0;
      top: 0;
      display: none;
      &:focus{
        display: block;
      }
    }
    &:hover{
      .user-buttons-box{
        display: block;
      }
    }
  }
  .stu-render {
    width: 192px;
    height: 108px;
    background-color: #666;
    border: 1px solid #fff;
    overflow: hidden;
  }
  .close {
    position: absolute;
    bottom: 1px;
    left: 0;
    right: 0;
    top: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .stu-info-con {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 22px;
    width: 190px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
    margin: 0 1px;
    background-color: #eeeeee5e;
    line-height: 22px;
  }
}
</style>
