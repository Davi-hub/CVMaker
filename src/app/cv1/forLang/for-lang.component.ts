import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ForLang } from 'src/app/data/data.model';
import { PrintService } from 'src/app/print/print.service';
import { DataService } from '../../data/data.service';
import { ForLangDialogComponent } from './for-lang-dialog.component';

@Component({
  selector: 'app-for-lang',
  templateUrl: './for-lang.component.html',
  styleUrls: ['./for-lang.component.css']
})
export class ForLangComponent implements OnInit, OnDestroy {

  // forLangList = this.dataService.forLangList;
  forLangList: ForLang[] = [];
  fLSubs = new Subscription;
  printStatus = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private printService: PrintService
  ) { }

  ngOnInit(): void {
    this.printStatus = this.printService.isItPrintMode();
    if (this.authService.isAuth()) {
      this.dataService.fetchForLangs();
      this.fLSubs = this.dataService.forLangsListChanged.subscribe(data => {
        this.forLangList = data;
      });
    }
    const fLL = sessionStorage.getItem('forLangList');
    if (fLL){
      this.forLangList = JSON.parse(fLL);
    }
  }

  openNewDialog() {
    const dialRef = this.dialog.open(ForLangDialogComponent, {data: false});
    dialRef.afterClosed().subscribe(data => {
      let foLa: ForLang = {
        lang: data.form.lang,
        contentFirst: data.form.contentFirst,
        contentSecond: data.form.contentSecond,
      };
      if (this.authService.isAuth()) {
        this.dataService.addItem(foLa, 'forLangs');
      } else {
        this.forLangList.push(foLa);
        sessionStorage.setItem('forLangList', JSON.stringify(this.forLangList));
      }
    });
  }

  openEditDialog(i: number) {
    const dialRef = this.dialog.open(ForLangDialogComponent, {data: this.forLangList[i]});
    dialRef.afterClosed().subscribe(data => {
      let foLa: ForLang = {
        lang: data.form.lang,
        contentFirst: data.form.contentFirst,
        contentSecond: data.form.contentSecond,
        id: data.id

      }
      if (this.authService.isAuth()) {
        this.dataService.updateItem(foLa, 'forLangs');
      } else {
        this.forLangList.splice(i, 1, foLa)
        sessionStorage.setItem('forLangList', JSON.stringify(this.forLangList));
      }
    });
  }

  openDeleteDialog(i: number) {
    if (this.authService.isAuth()) {
      this.dataService.deleteItem(this.forLangList[i], 'forLangs');
    } else {
      this.forLangList.splice(i);
      sessionStorage.setItem('forLangList', JSON.stringify(this.forLangList));
    }
  }

  ngOnDestroy(): void {
      this.fLSubs.unsubscribe();
  }

}
