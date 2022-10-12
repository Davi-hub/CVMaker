import { AuthData } from "./auth-data.model";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DataService } from "../data/data.service";
import { About } from "../data/data.model"

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  spinnerChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private dataService: DataService
  ) {}

  initAuthListener(){
    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/cv1']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.spinnerChange.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.login(authData);
      this.dataService.createDataSet(result.user?.uid);
    })
    .then(result => {
      this.useSessions();
      this.spinnerChange.next(false);
    })
    .catch(error => {
      this.spinnerChange.next(false);
      this.snackBar.open(error, 'Ok', {
        horizontalPosition: "center",
        verticalPosition: "top",
        })
    });
  }

  login(authData: AuthData){
    this.spinnerChange.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      this.spinnerChange.next(false);
    })
    .catch(error => {
      this.spinnerChange.next(false);
      this.snackBar.open(error, 'Ok', {
        horizontalPosition: "center",
        verticalPosition: "top",
      })
    });
  }

  isAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  resetPassword(email: string) {
    this.spinnerChange.next(true);
    this.afAuth.auth.sendPasswordResetEmail(email).then( result => {
      this.spinnerChange.next(false);
      this.router.navigate(['/login']);
      this.snackBar.open('A jelszó módosításhoz szükséges linket kiküldtük a megadott címre.', 'Ok', {
        horizontalPosition: "center",
        verticalPosition: "top",
      })
    })
    .catch(error => {
      this.spinnerChange.next(false);
      this.snackBar.open(error, 'Ok', {
        horizontalPosition: "center",
        verticalPosition: "top",
      })
    });
  }

  useSessions() {
    const perData = sessionStorage.getItem('perData');
    const about = sessionStorage.getItem('about');
    const stuJobsList = sessionStorage.getItem('stuJobsList');
    const forLangs = sessionStorage.getItem('forLangs');
    const techList = sessionStorage.getItem('techList');

    if (perData) {
      this.dataService.updateItem(JSON.parse(perData), 'perdata');
    }
    if (about) {
      this.dataService.updateItem(JSON.parse(about), 'about');
    }
    if (stuJobsList) {
      this.dataService.addItem(JSON.parse(stuJobsList), 'stuJobs');
    }
    if (forLangs) {
      this.dataService.addItem(JSON.parse(forLangs), 'forLangs');
    }
    if (techList) {
      this.dataService.addItem(JSON.parse(techList), 'techs');
    }
  }
}
