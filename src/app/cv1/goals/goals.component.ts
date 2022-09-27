import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data/data.service';
import { Goals } from '../../data/data.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GoalsDialog } from './goals-dialog.component';
import { map } from 'rxjs/operators';
import { PrintService } from 'src/app/print/print.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit, OnDestroy {

  goals: Goals = { id: "", goalsText: "Magamról..." };
  subsGoalsChanged = new Subscription;
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
      this.dataService.fetchGoals();
      this.subsGoalsChanged = this.dataService.goalsChanged.subscribe(goals => this.goals = goals);
    }
    const text = sessionStorage.getItem('goalsText');
    if (text && !this.authService.isAuth()){
      this.goals = {id: "", goalsText: text};
    }
  }

  openDialog() {
    const dialRef = this.dialog.open(GoalsDialog, { data: this.goals });
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
          this.dataService.updateItem(this.goals, 'goals');
        } else if (data) {
          sessionStorage.setItem('goalsText', data);
          this.goals.goalsText = data;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subsGoalsChanged) {
      this.subsGoalsChanged.unsubscribe();
    }
  }
}
