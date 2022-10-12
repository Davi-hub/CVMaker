import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data/data.service';
import { About } from '../../data/data.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialog } from './about-dialog.component';
import { map } from 'rxjs/operators';
import { PrintService } from 'src/app/print/print.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  about: About = { id: "", aboutText: "Magamról..." };
  subsAboutChanged = new Subscription;
  printStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private printService: PrintService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.printStatus = this.printService.isItPrintMode();
    if (this.authService.isAuth()) {
      this.dataService.fetchAbout();
      this.subsAboutChanged = this.dataService.aboutChanged.subscribe(about => this.about = about);
    }
    const text = sessionStorage.getItem('aboutText');
    if (text && !this.authService.isAuth()){
      this.about = {id: "", aboutText: text};
    }
  }

  openDialog() {
    const dialRef = this.dialog.open(AboutDialog, { data: this.about });
    dialRef.afterClosed().pipe(map(data => {
      if (data === "") {
        return "Magamról...";
      } else {
        return data;
      }
    }
    ))
      .subscribe(data => {
        if (data && this.authService.isAuth()) {
          this.dataService.updateItem(this.about, 'about');
        } else if (data) {
          sessionStorage.setItem('aboutText', data);
          this.about.aboutText = data;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subsAboutChanged) {
      this.subsAboutChanged.unsubscribe();
    }
  }
}
