import { Component, Inject } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html'
})

export class SkillsDialogComponent {

  f!: FormGroup;
  id!: string;
  index!: number

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.data) {
      this.index = this.data.index
      this.id = this.data.id as string;
      this.f = new FormGroup({
        'name': new FormControl(this.data.name),
        'level': new FormControl(this.data.level)
    })
    }else{
      this.f = new FormGroup({
        'name': new FormControl(),
        'level': new FormControl()
      })
    }
  }
}
