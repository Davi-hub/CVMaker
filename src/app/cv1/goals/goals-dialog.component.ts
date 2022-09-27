import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Goals } from "src/app/data/data.model";

@Component({
  selector: 'goals-dialog',
  templateUrl: './goals-dialog.component.html'
})
export class GoalsDialog {

  constructor (@Inject(MAT_DIALOG_DATA) public data: Goals) {}

}
