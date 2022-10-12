import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { About } from "src/app/data/data.model";

@Component({
  selector: 'about-dialog',
  templateUrl: './about-dialog.component.html'
})
export class AboutDialog {

  constructor (@Inject(MAT_DIALOG_DATA) public data: About) {}

}
