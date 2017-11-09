import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private user:UserService) {
  }

  ngOnInit() {
  }

}
