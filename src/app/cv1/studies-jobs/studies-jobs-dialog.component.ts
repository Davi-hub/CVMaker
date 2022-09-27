import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StuJobs } from 'src/app/data/data.model';
import { DataService } from '../../data/data.service';

@Component({
  selector: 'app-studies-jobs-dialog',
  templateUrl: './studies-jobs-dialog.component.html'
})
export class StudiesJobsDialogComponent implements OnInit {
  f!: FormGroup;
  id!: string;
  contentThird = new FormArray([]);

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: StuJobs) { }


  ngOnInit(): void {
    this.initForm();
  }

  inDialogAddButton() {
    (this.f.get('contentThird') as FormArray).push(
      new FormGroup({
      'item': new FormControl(''),
      'cerLink': new FormControl('')
      })
    );
  }

  initForm() {
    if (this.data) {
      this.id = this.data.id as string;
      let thirdArray = new FormArray([]);
      for (let i = 0; i < this.data.contentThird.length; i++) {
        thirdArray.push(
          new FormGroup({
            'item': new FormControl(this.data.contentThird[i].item),
            'cerLink': new FormControl(this.data.contentThird[i].cerLink),
          })
        );
      }
      this.f = new FormGroup({
        'yearsFrom': new FormControl(this.data.years[0]),
        'yearsTo': new FormControl(this.data.years[1]),
        'contentFirst': new FormControl(this.data.contentFirst),
        'contentSecond': new FormControl(this.data.contentSecond),
        'contentThird': thirdArray
    })
    }else{
      this.f = new FormGroup({
        'yearsFrom': new FormControl(''),
        'yearsTo': new FormControl(''),
        'contentFirst': new FormControl(''),
        'contentSecond': new FormControl(''),
        'contentThird': new FormArray([
          new FormGroup({
            'item': new FormControl(''),
            'cerLink': new FormControl('')
          })
        ])
      })
    }
  }

  get refForm() {
    return this.f.get('contentThird') as FormArray;
  }

}
