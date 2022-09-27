import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm!: FormGroup;
  spinnerState = false;
  spinnerSubscription = new Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.forgetForm = new FormGroup(
      { email: new FormControl("", { validators: [Validators.required, Validators.email] }) }
    );

    this.spinnerSubscription = this.authService.spinnerChange.subscribe(res => {
      this.spinnerState = res;
    })
  }

  onSubmit() {
    this.authService.resetPassword(this.forgetForm.value.email);
  }

  ngOnDestroy(): void {
    if (this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe();
    }
  }
}
