import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {isBoolean} from "util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  token:string;
  boolError:boolean = false;
  msgError:string;

  constructor(private dataService:DataService) {

  }

  ngOnInit() {
  }

  login(email,password) {
    this.boolError = false;
    var result = this.dataService.authenticate(email,password);
    result.subscribe(data => {
      var body = JSON.parse(data['_body']);
      console.log(body);
      if(body.type) {
        this.email = body.data.email;
        this.token = body.data.token;
        this.dataService.token = body.data.token;
      } else {
        this.boolError = true;
        this.msgError = "Mauvais couple email/password";
      }
    });
    return false;
  }

  signin(email,password) {
    this.boolError = false;
    if(email =='' || password == '') {
      this.boolError = true;
      this.msgError = "L'email et le password doivent etre rempli";
    } else {
      var result = this.dataService.sigin(email,password);
      result.subscribe(data => {
        var body = JSON.parse(data['_body']);
        if(body.type) {
          this.login(email,password);
        } else {
          this.boolError =true;
          this.msgError = body.data;
        }
      });
    }
    return false;
  }

}
