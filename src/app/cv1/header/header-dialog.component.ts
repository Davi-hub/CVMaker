import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app.header-dialog',
  templateUrl: 'header-dialog.component.html'
})

export class HeaderDialogComponent {

  f!: FormGroup;
  id!: string;

  constructor(
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.data) {
      this.id = this.data.id as string;
      this.f = new FormGroup({
        'firstName': new FormControl(this.data.firstName),
        'lastName': new FormControl(this.data.lastName),
        'phone': new FormControl(this.data.phone),
        'email': new FormControl(this.data.email),
        'local': new FormControl(this.data.local),
        'github': new FormControl(this.data.github),
        'linkedin': new FormControl(this.data.linkedin),
        'profile': new FormControl(this.data.profile)
      })
    }
  }
}
