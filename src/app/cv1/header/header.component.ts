import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { HeaderDialogComponent } from './header-dialog.component';
import { PerData } from 'src/app/data/data.model';
import { PrintService } from 'src/app/print/print.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  personal: PerData = this.dataService.personal;
  localParam!: string;
  printStatus: boolean = false;
  personalDataSubs = new Subscription();

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private printService: PrintService,
  ) { }


  ngOnInit(): void {
    this.printStatus = this.printService.isItPrintMode();
    if (this.authService.isAuth()) {
      this.dataService.fetchPerData();
      this.personalDataSubs = this.dataService.perDataChanged.subscribe(data => {
        this.personal = data;
      });
    } else {
      const pData = sessionStorage.getItem('perData');
      if (pData){
        this.personal = JSON.parse(pData);
      }
      this.localParam = this.personal.local.replace(/ /g, '+');
    }
  }

  openEditDialog() {
    const dialRef = this.dialog.open(HeaderDialogComponent, { data: this.personal });
    dialRef.afterClosed().subscribe(data => {
      if (data) {
        let pers: PerData = {
          firstName: data.form.firstName,
          lastName: data.form.lastName,
          phone: data.form.phone,
          email: data.form.email,
          local: data.form.local,
          github: data.form.github,
          linkedin: data.form.linkedin,
          profile: data.form.profile,
          id: data.id
        };
        if (this.authService.isAuth()) {
          this.dataService.updateItem(pers, 'perdata');
        } else {
          sessionStorage.setItem('perData', JSON.stringify(pers));
          this.personal = pers;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.personalDataSubs.unsubscribe();
  }
}
