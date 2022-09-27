import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { Cv1Component } from "./cv1/cv1.component";
import { ForgetPasswordComponent } from "./auth/forget-password/forget-password.component";
import { Cv2Component } from "./cv2/cv2.component";
import { PrintComponent } from "./print/print.component";
import { HomeComponent } from "./home/home.component";


  const appRoutes: Routes = [
    // { path: "", redirectTo: "/login", pathMatch: "full"},
    { path: "", component: HomeComponent, children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "forgetpass", component: ForgetPasswordComponent },
      { path: "cv1", component: Cv1Component },
      { path: "cv2", component: Cv2Component },

    ]},
    { path: "print", component: PrintComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {

}
