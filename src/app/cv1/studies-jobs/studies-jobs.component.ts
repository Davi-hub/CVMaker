import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { StuJobs } from 'src/app/data/data.model';
import { PrintService } from 'src/app/print/print.service';
import { DataService } from '../../data/data.service';
import { StudiesJobsDialogComponent } from './studies-jobs-dialog.component';

@Component({
  selector: 'app-studies-jobs',
  templateUrl: './studies-jobs.component.html',
  styleUrls: ['./studies-jobs.component.css']
})
export class StudiesJobsComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private printService: PrintService
  ) { }

  stuJobsList: StuJobs[] = [];
  sJLChSubs = new Subscription();
  printStatus: boolean = false;

  ngOnInit(): void {
    this.printStatus = this.printService.isItPrintMode();
    if (this.authService.isAuth()) {
      this.dataService.fetchStuJobs();
      this.sJLChSubs = this.dataService.stuJobsListChanged.subscribe(data => {
        this.stuJobsList = data;
      });
    } else {
      const stJbL = sessionStorage.getItem('stuJobsList')
      if (stJbL) {
        this.stuJobsList = JSON.parse(stJbL);
      }
    }
  }

  openNewDialog() {
    const dialRef = this.dialog.open(StudiesJobsDialogComponent, {data: false});
    dialRef.afterClosed().subscribe(data => {
      const stJb: StuJobs = {
        years: [data.form.yearsFrom, data.form.yearsTo],
        contentFirst: data.form.contentFirst,
        contentSecond: data.form.contentSecond,
        contentThird: data.form.contentThird
      };
      if (this.authService.isAuth()) {
        this.dataService.addItem(stJb, 'stuJobs');
      } else {
        this.stuJobsList.push(stJb);
        sessionStorage.setItem('stuJobsList', JSON.stringify(this.stuJobsList));
      }
    });
  }

  openEditDialog(i: number) {
    const dialRef = this.dialog.open(StudiesJobsDialogComponent, {data: this.stuJobsList[i]});
    dialRef.afterClosed().subscribe(data => {
      if (data) {
        let stJb: StuJobs = {
          years: [data.form.yearsFrom, data.form.yearsTo],
          contentFirst: data.form.contentFirst,
          contentSecond: data.form.contentSecond,
          contentThird: data.form.contentThird,
          id: data.id
        };
        if (this.authService.isAuth()) {
          this.dataService.updateItem(stJb, 'stuJobs');
        } else {
          this.stuJobsList.splice(i, 1, stJb);
          sessionStorage.setItem('stuJobsList', JSON.stringify(this.stuJobsList));
        }
      }
    });
  }

  openDeleteDialog(i:number) {
    if (this.authService.isAuth()) {
      this.dataService.deleteItem(this.stuJobsList[i], 'stuJobs');
    } else {
      this.stuJobsList.splice(i, 1);
      sessionStorage.setItem('stuJobsList', JSON.stringify(this.stuJobsList));
    }
  }

  ngOnDestroy(): void {
    this.sJLChSubs.unsubscribe();
  }
}
