/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-26 14:13:40
 * @LastEditTime: 2021-10-26 14:17:40
 * @LastEditors: Yandong Hu
 * @Description:
 */
import { Injectable, NgZone } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private num = 0;
  private tplModal: any;
  private timer: any;
  private autoTimer: any;

  constructor(
    private modal: NzModalService,
    private ngZone: NgZone,
  ) {
  }

  loadingShow(text?: string | undefined, time?: number | undefined) {
    this.clearClose();
    this.num++;
    if (this.num == 1) {
      setTimeout(() => this.open(text));
    }

    this.autoClose(time);
  }

  loadingHide() {
    this.num--;
    if (this.num == 0) {
      this.close();
    } else if (this.num < 0) {
      this.num = 0;
    }
  }

  private open(text = 'loading') {
    if (!this.tplModal) {
      this.tplModal = this.modal.create({
        nzClassName: 'no-bg',
        nzWidth: '100vw',
        nzClosable: false,
        nzMask: true,
        nzStyle: {
          top: '20vw',
        },
        nzFooter: null,
        nzContent: LoadingComponent,
        nzComponentParams: { text },
      });
      this.tplModal.afterOpen.subscribe(() => {
        const wrap = document.getElementById('loadingBoxWrap');
        let parent = wrap && wrap.parentElement;
        while (parent) {
          if (parent.classList.contains('cdk-overlay-pane')) {
            parent.style.zIndex = '1001';
            break;
          }
          parent = parent.parentElement;
        }
      });
      this.tplModal.afterClose.subscribe(() => {
        this.tplModal = null;
        this.num = 0;
      });
    }
  }

  private close() {
    this.timer = setTimeout(() => this.doClose());
  }

  private doClose() {
    this.clearAutoClose();
    if (this.tplModal) {
      this.timer = setTimeout(() => this.ngZone.run(() => this.tplModal.destroy()));
    }
  }

  private autoClose(time = 10) {
    this.clearAutoClose();
    this.autoTimer = setTimeout(() => this.doClose(), time * 1000);
  }

  private clearAutoClose() {
    clearTimeout(this.autoTimer);
  }

  private clearClose() {
    clearTimeout(this.timer);
  }
}
