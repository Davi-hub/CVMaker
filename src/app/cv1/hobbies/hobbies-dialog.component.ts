import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService } from "src/app/data/data.service";

@Component({
  selector: 'app-hobbies-dialog',
  templateUrl: './hobbies-dialog.component.html'
})

export class HobbiesDialogComponent {

  f!: FormGroup;
  id!: string;

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.data) {
      this.id = this.data.id as string;
      this.f = new FormGroup({
        'name': new FormControl(this.data.name),
        'src': new FormControl(this.data.src)
    })
    }else{
      this.f = new FormGroup({
        'name': new FormControl(''),
        'src': new FormControl('')
      })
    }
  }
}
