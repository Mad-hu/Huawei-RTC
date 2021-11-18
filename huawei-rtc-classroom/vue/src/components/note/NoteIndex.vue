<!--
 * @Description: button for lock , only request
-->
<template>
  <div class="note-index" ref="noteIndexRef">
    <div class="canvas1" :class="[
      !shareState.screenShareLocalState && !mouseLeave? 'cursor-normal': '',
      mouseLeave? 'mouseLeave': ''
    ]" ref="canvasNoteRef"></div>
    <div class="mouse" ref="mouseRef">&#xe61f;</div>
    <div
      class="btns"
      @mouseenter="enterBtnsAction()"
      @mouseleave="leaveBtnsAction()"
      v-if="noteState.visible"
    >
      <el-button size="mini" type="primary" @click="handleCircle">圆</el-button>
      <el-button size="mini" type="primary" @click="handleRect">矩形</el-button>
      <el-button size="mini" type="primary" @click="handleRedo">重做</el-button>
      <el-button size="mini" type="primary" @click="handleUndo">撤销</el-button>
      <el-button size="mini" type="primary" @click="handleClear">清空</el-button>
      <el-button size="mini" type="primary" @click="handleRed">画笔红色</el-button>
      <el-button size="mini" type="primary" @click="handleGreen">画笔绿色</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Prop, Vue, Watch } from "vue-property-decorator";
import { msgForWhiteBoard } from "../../services/classroom.service";
import { rtmTextMessageCategory } from "../../services/common/abstract/rtm.abstract";
import { RtmService } from "../../services/common/rtm.service";
import { ShareState, WHITE_BOARD_MSG_TYPES } from "../../services/state-manager/classroom-state.service";
import { NoteState } from "../../services/state-manager/note-state.service";
import HbSdkWebService from "../../services/common/hwwb/hb-sdk-web-service";
import { windowService } from "../../services/window.service";
import { UserInfoState } from "../../services/state-manager/user-state.service";
import { RtcService } from "../../services/common/rtc.service";

@Options({
  components: {},
})
export default class NoteIndex extends Vue {
  wb1: any = null; // 白板实例
  instance: any = null;
  baseStyle: any = { width: 0, hegiht: 0 }; // 白板的原始宽高，后续的白板宽高都以这个基数 算比例
  noteState = NoteState;
  mouseLeave = false;
  shareState = ShareState;
  userInfoState = UserInfoState;
  @Watch("noteState.visible")
  onDialogVisibileChange(newV: boolean, oldV: boolean) {
    console.log("onDialogVisibileChange NoteIndex:", newV, oldV);
    if (newV) {
      this.mouseLeave = false;
      this.setIgnoreMouseEvents(false);
      this.mouseMoveEvent();
      // 显示画笔后，没有创建画板开始创建
      if(!this.wb1) {
        this.handleCreate();
      }
    } else {

      this.mouseMoveEvent(false);
    }
  }
  /**
   * 监听本地共享状态，如果关闭共享，清理画板，关闭画板
   */
  @Watch("shareState.screenShareLocalState")
  onShareStateChange(newV: boolean, oldV: boolean) {
    console.log("onShareStateChange:", newV, oldV);
    this.handleClear();
    this.noteState.visible = false;
    this.mouseLeave = true;
    this.mouseMoveEvent(false);
  }
  enterBtnsAction() {
    this.setIgnoreMouseEvents(false);
  }
  leaveBtnsAction() {
    if (this.mouseLeave == false) {
      return;
    }
    this.setIgnoreMouseEvents(true);
  }
  /**
   * 右键后取消绘制,窗体点击穿透
   */
  cancelDrawOnMouseup() {
    const canvasNote = <HTMLCanvasElement>this.$refs["canvasNoteRef"];
    canvasNote.onmouseup = (mouseEvent: MouseEvent) => {
      if (mouseEvent.button == 2) {
        this.setIgnoreMouseEvents(true);
        this.mouseLeave = true;
      }
    };
  }

  mouseMoveEvent(moveState: boolean = true) {
    if(this.userInfoState.role == 'student') {
      return;
    }
    console.log('mouseMoveEvent:', moveState);
    const mouse = <HTMLDivElement>this.$refs["mouseRef"];
    const noteIndexRef = <HTMLDivElement>this.$refs["noteIndexRef"];
    const moveFunc = (event: MouseEvent) => {
      if (!mouse) return;
      if (this.mouseLeave) {
        mouse.style.display = "none";
        return;
      }
      mouse.style.display = "block";
      mouse.style.left = event.clientX + "px";
      mouse.style.top = event.clientY - 23 + "px";
    };
    if (moveState) {
      noteIndexRef.addEventListener("mousemove", moveFunc);
    } else {
      noteIndexRef.removeEventListener("mousemove", moveFunc);
      mouse.style.display = "none";
    }
  }
  handleCreate() {
    console.log('handleCreate draw !!!');
    if (this.wb1) {
      return;
    }
    this.creactWB();
    RtmService().on(rtmTextMessageCategory.HWWHITE_BOARD, (data) => {
      console.log(rtmTextMessageCategory.HWWHITE_BOARD, data);
      const { status, param, targetUserId } = data;
      // 非本机返回
      if(RtcService().getUserLocalId() != targetUserId) {
        return;
      }
      console.log(rtmTextMessageCategory.HWWHITE_BOARD, param.data);
      if (status == WHITE_BOARD_MSG_TYPES.WB_CREACT) {
      } else if (status == WHITE_BOARD_MSG_TYPES.WB_SAVESHAPE) {
        this.wb1.saveShape(
          this.instance.JSONToShape_Hb(param.data),
          false,
          param.data.id
        );
      } else if (status == WHITE_BOARD_MSG_TYPES.WB_REDO) {
        this.wb1.redo(false);
      } else if (status == WHITE_BOARD_MSG_TYPES.WB_UNDO) {
        this.wb1.undo(false);
      } else if (status == WHITE_BOARD_MSG_TYPES.WB_CLEAR) {
        this.wb1.clear(false);
      } else if (status == WHITE_BOARD_MSG_TYPES.WB_TEARDOWN) {
        this.wb1.teardown(false);
      }
    });
    this.cancelDrawOnMouseup();
  }
  handleCircle() {
    this.checkBtnCreateAndWindowMode();
    const tool = this.instance.ellipse_Hb(this.wb1);
    this.wb1.setTool(tool);
  }
  handleRect() {
    this.checkBtnCreateAndWindowMode();
    const tool = this.instance.rectangle_Hb(this.wb1);
    this.wb1.setTool(tool);
  }
  handleRedo() {
    this.checkBtnCreateAndWindowMode();
    this.wb1.redo();
  }
  handleUndo() {
    this.checkBtnCreateAndWindowMode();
    this.wb1.undo();
  }
  handleClear() {
    this.checkBtnCreateAndWindowMode();
    this.wb1.clear();
  }
  handleDestory() {
    if (this.wb1) {
      this.wb1.teardown();
      this.wb1 = null;
      msgForWhiteBoard("all", WHITE_BOARD_MSG_TYPES.WB_TEARDOWN, {});
    }
  }
  handleRed() {}
  handleGreen() {}
  listeners() {
    let that = this;
    // 画一笔
    this.wb1.on("shapeSave", function (shape: any) {
      const param = {
        type: "shapeSave",
        data: that.instance.shapeToJSON_Hb(shape.shape),
      };
      console.log("shapeSave", param);

      msgForWhiteBoard(ShareState.currentShare.userId, WHITE_BOARD_MSG_TYPES.WB_SAVESHAPE, param);
    });
    // 后退
    this.wb1.on("undo", function () {
      const param = {
        type: "undo",
      };
      console.log(`${window.name}undo`, param);
      msgForWhiteBoard(ShareState.currentShare.userId, WHITE_BOARD_MSG_TYPES.WB_UNDO, param);
    });
    // 前进
    this.wb1.on("redo", function () {
      const param = {
        type: "redo",
      };
      console.log("redo", param);
      msgForWhiteBoard(ShareState.currentShare.userId, WHITE_BOARD_MSG_TYPES.WB_REDO, param);
    });
    // 清空
    this.wb1.on("clear", function () {
      const param = {
        type: "clear",
      };
      msgForWhiteBoard(ShareState.currentShare.userId, WHITE_BOARD_MSG_TYPES.WB_CLEAR, param);
    });
  }
  creactWB() {
    const dom = <HTMLCanvasElement>this.$refs["canvasNoteRef"];
    this.instance = new HbSdkWebService(dom, {
      scale: 1, // 设置相对于老师的白板的比例(当前画板宽度/老师画布宽度)
      defaultStrokeWidth: 2, // 图形边线宽细
      primaryColor: "red", // 图形边线颜色
      secondaryColor: "transparent", // 图形填充颜色
      isCanDraw: true, // 是否能画
    });
    this.wb1 = this.instance.engine;
    this.baseStyle = this.getNodeWH(dom);
    const param = { ...this.baseStyle };
    //  ws.emit(MSGTYPE.WB_CREACT, param);
    // msgForWhiteBoard("all", WHITE_BOARD_MSG_TYPES.WB_CREACT, param);
    this.listeners();
  }

  getNodeWH(node: any) {
    const { width, height } = node.getBoundingClientRect();
    return { width, height };
  }

  checkBtnCreateAndWindowMode() {
    this.mouseLeave = false;
    this.setIgnoreMouseEvents(false);
    this.mouseMoveEvent(true);
    if (!this.wb1) {
      this.handleCreate();
    }
  }
  /**
   * 学生不对窗口做任何操作
   */
  setIgnoreMouseEvents(flag: boolean) {
    // 学生，没有画笔
    if(this.userInfoState.role == 'student') {
      return;
    }
    // 本地没共享，说明在看学生共享的视频，不对窗口做操作
    if(!ShareState.screenShareLocalState) {
      return;
    }
    windowService().setIgnoreMouseEvents(flag);
  }
}
</script>

<style lang="less" scoped>
// btns top 90  canvas 100% 100%
.note-index {
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  overflow: hidden;
  .btns {
    display: flex;
    margin-top: 90px;
    z-index: 2;
  }
}
.canvas1 {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 0;
  cursor: none;
  canvas {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
.mouseLeave {
  pointer-events: none;
}
.mouse {
  position: fixed;
  left: -100px;
  z-index: 2;
  font-size: 20px;
  color: #fff;
  font-family: "iconfont" !important;
  pointer-events: none;
  height: 25px;
  width: 20px;
}
.cursor-normal {
  cursor: unset;
}
</style>
<style lang="less">
.canvas1 {
  position: absolute;
  height: 100%;
  width: 100%;
  canvas {
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>
