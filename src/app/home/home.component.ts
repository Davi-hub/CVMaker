import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuth = false;
  authSubscribe!: Subscription

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscribe = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
    this.authService.initAuthListener();
  }

  logout() {
    this.authService.logout();
  }

  onPrint() {
    window.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscribe) {
      this.authSubscribe.unsubscribe();
    }
  }
}
