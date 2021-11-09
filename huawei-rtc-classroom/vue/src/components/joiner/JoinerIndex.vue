<!--
 * @Description: joiners show , one joiner
-->
<template>
   <joiner-one v-if="len == 1"></joiner-one>
   <joiner-two v-else-if="len == 2"></joiner-two>
   <joiner-three-or-four v-else-if="len==3"></joiner-three-or-four>
   <joiner-others v-else></joiner-others>
</template>

<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { UserListState } from "../../services/state-manager/classroom-state.service";
import JoinerOne from "./JoinerOne.vue"
import JoinerTwo from "./JoinerTwo.vue"
import JoinerThreeOrFour from "./JoinerThreeOrFour.vue"
import JoinerOthers from "./JoinerOthers.vue"

@Options({
  components: {
    JoinerOne,
    JoinerTwo,
    JoinerThreeOrFour,
    JoinerOthers
  },
})
export default class JoinerIndex extends Vue {
  get len() {
    return UserListState.lists.length;
  }
}
</script>

<style lang="less" scoped>

</style>
