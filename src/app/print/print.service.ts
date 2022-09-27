import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class PrintService {
  constructor(public router: Router) {}

  isItPrintMode() {
    if(this.router.url === '/print') {
      return true;
    }
    return false;
  }
}
