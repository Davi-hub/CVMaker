import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Hobby } from 'src/app/data/data.model';
import { PrintService } from 'src/app/print/print.service';
import { DataService } from '../../data/data.service';
import { HobbiesDialogComponent } from './hobbies-dialog.component';


@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {

  hobbyList: Hobby[] = [];
  hobbies: any[] = [];
  hobbySubs = new Subscription();
  arrayIsEmpty = false;
  printStatus: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private dialog: MatDialog,
    private printService: PrintService ) { }

  ngOnInit() {
    this.printStatus = this.printService.isItPrintMode();
    if (this.authService.isAuth()) {
      this.dataService.fetchHobby();
    }
    this.hobbySubs = this.dataService.hobbyListChanged.subscribe(data => {
      this.hobbyList = [...data];
      this.setArrays();
      if (this.hobbies[0].length == 0) {
        this.arrayIsEmpty = true;
      }else{
        this.arrayIsEmpty = false;
      }
    });
  }

  setArrays() {
    let j = (this.hobbyList.length+1)/3
    let hobbiesArray = [];
    for(let i=0; i<j; i++) {
      console.log(this.hobbyList[0]);
      hobbiesArray.push(this.hobbyList.splice(0,3));
      this.hobbies = [...hobbiesArray];
    };
  }

  openNewDialog() {
    const dialRef = this.dialog.open(HobbiesDialogComponent, {data: false});
    dialRef.afterClosed().subscribe(data => {
      let hobby: Hobby = {
        name: data.form.name,
        src: data.form.src,
      };
      if (this.authService.isAuth()) {
        this.dataService.addItem(hobby, 'hobbies');
      }
    });
  }

  openEditDialog(i: number, j: number) {
    const dialRef = this.dialog.open(HobbiesDialogComponent, {data: this.hobbies[i][j]});
    dialRef.afterClosed().subscribe(data => {
      let hobby: Hobby = {
        name: data.form.name,
        src: data.form.src,
        id: data.id
      };
      if (this.authService.isAuth()) {
        this.dataService.updateItem(hobby, 'hobbies');
      }
    });
  }

  openDeleteDialog(i:number, j: number) {
    this.dataService.deleteItem(this.hobbies[i][j], 'hobbies');
  }
}
