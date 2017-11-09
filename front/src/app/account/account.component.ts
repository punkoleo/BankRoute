import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
declare var System: any;


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  sold:Number;
  listTransactions = [];
  boolError:Boolean;
  msgError:String;
  boolSuccess:Boolean;
  msgSuccess:String;


  constructor(private dataService:DataService) {
  }

  ngOnInit() {
    var result = this.dataService.getInfo();
    result.subscribe(data => {
      var body = JSON.parse(data['_body']);
      if(body.type) {
        this.sold = body.data.sold;
      }
    });

    this.dataService.getTransaction().subscribe(data => {
      var body = JSON.parse(data['_body']);
      this.listTransactions = body.data;

      System.import('./external.js')
        .then(extJS=>extJS.loadDataTable(this.listTransactions));
    });
  }

  virement(montant,destinataire) {
    this.boolSuccess = false;
    this.msgSuccess= '';
    this.boolError = false;
    this.msgError = '';
    montant = +montant;
    if(isNaN(montant)) {
      this.boolError = true;
      this.msgError = "Veuillez saisir un montant"
    }
    if(destinataire === '') {
      this.boolError = true;
      this.msgError = this.msgError+" Veuillez saisir un destinataire"
    }
    if(this.boolError) {
      return false;
    }
    var result = this.dataService.virement(montant,destinataire);
    result.subscribe(data => {
      var body = JSON.parse(data['_body']);
      if(!body.type) {
        this.boolError = true;
        this.msgError = body.data;
      } else {
        this.boolSuccess = true;
        this.msgSuccess = body.data;
        return this.ngOnInit();
      }
    });
  }
}
