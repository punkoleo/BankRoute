import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  isLoggued:boolean = false;
  email:string;

  constructor() {
  }

}
