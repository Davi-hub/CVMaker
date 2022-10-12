import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './cv1/header/header.component';
import { StudiesJobsComponent } from './cv1/studies-jobs/studies-jobs.component';
import { ForLangComponent } from './cv1/forLang/for-lang.component';
import { SkillsComponent } from './cv1/skills/skills.component';
import { HobbiesComponent } from './cv1/hobbies/hobbies.component';
import { AboutComponent } from './cv1/about/about.component';
import { Cv1Component } from './cv1/cv1.component';
import { Cv2Component } from './cv2/cv2.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

import { AboutDialog } from './cv1/about/about-dialog.component';
import { StudiesJobsDialogComponent } from './cv1/studies-jobs/studies-jobs-dialog.component';
import { ForLangDialogComponent } from './cv1/forLang/for-lang-dialog.component';
import { SkillsDialogComponent } from './cv1/skills/skills-dialog.component';
import { HobbiesDialogComponent } from './cv1/hobbies/hobbies-dialog.component';
import { HeaderDialogComponent } from './cv1/header/header-dialog.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { AppMaterialModule } from './app-material.module';
import { HomeComponent } from './home/home.component';
import { PrintComponent } from './print/print.component';

import { DragDropModule } from '@angular/cdk/drag-drop'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    StudiesJobsComponent,
    ForLangComponent,
    SkillsComponent,
    HobbiesComponent,
    AboutComponent,
    Cv1Component,
    Cv2Component,
    SignupComponent,
    LoginComponent,
    AboutDialog,
    StudiesJobsDialogComponent,
    ForLangDialogComponent,
    SkillsDialogComponent,
    HobbiesDialogComponent,
    HeaderDialogComponent,
    ForgetPasswordComponent,
    PrintComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,

    DragDropModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutDialog,
    StudiesJobsDialogComponent,
    ForLangDialogComponent,
    SkillsDialogComponent,
    HobbiesDialogComponent,
    HeaderDialogComponent
  ]
})
export class AppModule { }
