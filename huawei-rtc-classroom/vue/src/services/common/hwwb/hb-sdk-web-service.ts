/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-11-16 10:25:53
 * @LastEditTime: 2021-11-18 15:14:26
 * @LastEditors: Yandong Hu
 * @Description:
 */
import {HBBaseProvider, HbEventType} from "./hb.abstract"
import EventEmitter from "events";
export default class HbSdkWebService extends HBBaseProvider{
  public engine :any
  // private static instance: HbSdkWebService;

  constructor(dom:any, param:any) {
    super()
    EventEmitter.defaultMaxListeners = 20;
    this.init(dom, param)
  }
  // static getInstance(dom:any, param:any):HbSdkWebService {
  //   if(!this.instance) {
  //     this.instance = new HbSdkWebService(dom, param);
  //     return this.instance;
  //   }
  //   return this.instance
  // }
  /**
   *
   * @param dom
   * @param param  { scale: 1, // 设置相对于老师的白板的比例(当前画板宽度/老师画布宽度)
      defaultStrokeWidth: 2, // 图形边线宽细
      primaryColor: "red", // 图形边线颜色
      secondaryColor: "transparent", // 图形填充颜色
      isCanDraw: true, // 是否能画}
   */
  init(dom:any, param:any) {
    this.engine = new TKWB.TKCanvas(dom, param);
    this.sdkEvent();
  }


   JSONToShape_Hb(data:any) {
    return TKWB.shapes.JSONToShape(data)
  }

   shapeToJSON_Hb(shape:any){
    return TKWB.shapes.shapeToJSON(shape)
  }

   ellipse_Hb(hb: any) {
    return new TKWB.Ellipse(hb)
  }

   rectangle_Hb(hb: any) {
    return new TKWB.Rectangle(hb);
  }

  sdkEvent(): void {
    this.engine.on(HbEventType.shapeSave,(shape:any)=> {
      this.emit(HbEventType.shapeSave, shape)
    })
    this.engine.on(HbEventType.undo, ()=>{
      this.emit(HbEventType.undo, {})
    })
    this.engine.on(HbEventType.redo, ()=>{
      this.emit(HbEventType.redo, {})
    })
    this.engine.on(HbEventType.clear, ()=>{
      this.emit(HbEventType.clear, {})
    })
  }

  shapeSave(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  undo(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  redo(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
