import EventEmitter from "events";

export abstract class HBBaseProvider extends EventEmitter {
  abstract init(dom:any, data: any): void;
  abstract sdkEvent(): void;
  abstract JSONToShape_Hb(data:any):Promise<any>
  abstract shapeToJSON_Hb(shape:any):Promise<any>
  abstract rectangle_Hb(hb: any):Promise<any>
  abstract ellipse_Hb(hb: any):Promise<any>
  // 画一笔
   abstract shapeSave(): Promise<any>;
  // 后退
  abstract undo(): Promise<void>;
  // 前进
  abstract redo():Promise<void>;
  // 清空
  abstract clear():Promise<void>;

}
// 画笔的监听事件
export enum HbEventType {
  shapeSave = 'shapeSave',
  undo= 'undo',
  redo= 'redo',
  clear= 'clear'
}
