import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Tech } from 'src/app/data/data.model';
import { PrintService } from 'src/app/print/print.service';
import { DataService } from '../../data/data.service';
import { SkillsDialogComponent } from './skills-dialog.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnDestroy {

  // techList: Tech[] = this.dataService.techList;
  techList: Tech[] = [];
  tchSubs = new Subscription;
  printStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private printService: PrintService
  ) { }

  ngOnInit(): void {
    this.printStatus = this.printService.isItPrintMode()
    if (this.authService.isAuth()) {
      this.dataService.fetchTech();
      this.tchSubs = this.dataService.techListChanged.subscribe(data => {
        this.techList = data;
      });
    }
    const tchLst = sessionStorage.getItem('techList');
    if (tchLst){
      this.techList = JSON.parse(tchLst);
    }

  }

  openNewDialog() {
    const dialRef = this.dialog.open(SkillsDialogComponent, {data: false});
    dialRef.afterClosed().subscribe(data => {
      let tech: Tech = {
        name: data.form.name,
        level: data.form.level,
        index: 100
      };
      if (this.authService.isAuth()) {
        this.dataService.addItem(tech, 'techs');
      } else {
        this.techList.push(tech);
        sessionStorage.setItem('techList', JSON.stringify(this.techList));
      }
    });
  }

  openEditDialog(i: number) {
    const dialRef = this.dialog.open(SkillsDialogComponent, {data: this.techList[i]});
    dialRef.afterClosed().subscribe(data => {
      if (data) {
        let tech: Tech = {
          name: data.form.name,
          level: data.form.level,
          id: data.id,
          index: data.index
        };
        if (this.authService.isAuth()) {
          this.dataService.updateItem(tech, 'techs');
        } else {
          this.techList.splice(i, 1, tech);
          sessionStorage.setItem('techList', JSON.stringify(this.techList));
        }
      }
    });
  }

  openDeleteDialog(i: number) {
    if (this.authService.isAuth()) {
      this.dataService.deleteItem(this.techList[i], 'techs');
    } else {
      this.techList.splice(i, 1);
      sessionStorage.setItem('techList', JSON.stringify(this.techList));
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.techList, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.techList.length; i++) {
      this.techList[i].index = i;
    }
    for (let i = 0; i < this.techList.length; i++) {
      if (this.authService.isAuth()) {
        this.dataService.updateItem(this.techList[i], 'techs');
      } else {
        this.techList.splice(i, 1, this.techList[i]);
        sessionStorage.setItem('techList', JSON.stringify(this.techList));
      }
    }
  }

  ngOnDestroy(): void {
      this.tchSubs.unsubscribe();
  }
}
