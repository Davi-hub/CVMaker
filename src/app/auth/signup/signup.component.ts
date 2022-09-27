import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate!: Date;
  spinnerState = false;
  spinnerSubscription = new Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-16);
    this.spinnerSubscription = this.authService.spinnerChange.subscribe( res => {
      this.spinnerState = res;
    })
  }

  onSubmit(f: NgForm){
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe()
    }
  }
}
