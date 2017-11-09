import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

import {DataService} from "./services/data.service";
import { AccountComponent } from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
