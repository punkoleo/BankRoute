import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import "rxjs/add/operator/map";
import {headersToString} from "selenium-webdriver/http";

@Injectable()
export class DataService {
  baseUri:string = 'http://localhost:3000';
  token:string;

  constructor(private http:Http) {
    console.log("HTTP loaded");
  }

  /**
   * Authentification
   * @param email
   * @param password
   * @returns {Observable<Response>}
   */
  authenticate(email,password) {
    return this.http.post(`${this.baseUri}/users/authenticate`, {'email':email,'password':password});
  }

  /**
   * Inscription
   * @param email
   * @param password
   * @returns {Observable<Response>}
   */
  sigin(email,password) {
    return this.http.post(`${this.baseUri}/users/signin`, {'email':email,'password':password});
  }

  /**
   * Recuperation des informations
   * @returns {Observable<Response>}
   */
  getInfo() {
    return this.http.get(`${this.baseUri}/users/me`,{
      headers: new Headers({'Authorization': `Bearer ${this.token}`})
    })
  }

  /**
   * Effectue le virement
   * @param montant
   * @param destinataire
   */
  virement(montant,destinataire) {
    return this.http.post(
      `${this.baseUri}/users/virement`,
      {'email':destinataire,'montant':montant},
      {
        headers: new Headers({'Authorization': `Bearer ${this.token}`})
      });
  }

  getTransaction() {
    return this.http.get(
      `${this.baseUri}/users/transactions`,
      {
        headers: new Headers({'Authorization': `Bearer ${this.token}`})
      });
  }
}
