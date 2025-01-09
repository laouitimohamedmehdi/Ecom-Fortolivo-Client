import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderRequestCount: number = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  loader() {
    this.loaderRequestCount++;
    this.spinnerService.show();
    // this.spinnerService.show(undefined, {
    //   type: "square-jelly-box",
    //   color: "#fef100",
    //   bdColor: "rgb(49,47,49)",
    //   size: "medium"
    // });
  }

  hidingLoader() {
    this.loaderRequestCount--;
    if (this.loaderRequestCount <= 0) {
      this.loaderRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
