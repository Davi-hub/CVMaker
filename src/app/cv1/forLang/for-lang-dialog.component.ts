import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-for-lang-dialog',
  templateUrl: './for-lang-dialog.component.html'
})
export class ForLangDialogComponent implements OnInit {
  f!: FormGroup;
  id!: string;

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }

  inDialogAddButton() {
    (this.f.get('contentThird') as FormArray).push(new FormControl(''));
  }

  initForm() {
    if (this.data) {
      this.id = this.data.id as string;
      this.f = new FormGroup({
        'lang': new FormControl(this.data.lang),
        'contentFirst': new FormControl(this.data.contentFirst),
        'contentSecond': new FormControl(this.data.contentSecond),
    })
    }else{
      this.f = new FormGroup({
        'lang': new FormControl(''),
        'contentFirst': new FormControl(''),
        'contentSecond': new FormControl(''),
      })
    }
  }
}
