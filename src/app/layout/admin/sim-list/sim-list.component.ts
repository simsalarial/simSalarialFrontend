import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountServiceService } from 'src/app/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { faSearch, faEuroSign, faPercentage, faCalculator, faCalendarAlt, faBalanceScaleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';

@Component({
  selector: 'app-sim-list',
  templateUrl: './sim-list.component.html',
  styleUrls: ['./sim-list.component.scss']
})
export class SimListComponent implements OnInit {
public keys;

faSearch = faSearch;
faEuroSign = faEuroSign;
faPercentage = faPercentage;
faCalculator = faCalculator;
faCalendarAlt = faCalendarAlt;
faBalanceScaleRight = faBalanceScaleRight;
faUser = faUser;

data = [];
 // DATE VARIABLES //
 bothDates: any;
 // DATE VARIABLES //
 selectedSimulations: any;

 tempMail = this.accountService.getCurrentEmail();

@ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;


  constructor( private accountService: AccountServiceService, private localeService: BsLocaleService) {
    this.keys = [
      {prop: 'user'},
      {prop: 'name'},
      {prop: 'simulation'},
      {prop: 'marginPercentage'},
      {prop: 'anualRate'},
      {prop: 'anualTotalCost'},
      {prop: 'netSalaryWithoutDuo'},
      {prop: 'netSalaryWithDuo'}
    ]
  }

  ngOnInit() {
    this.data = [];
    this.selectedSimulations = [];
    
    let email = this.accountService.getCurrentEmail();
    this.accountService.getAllSimulationsFromAccount(email);
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  filterByDate() {

    console.log(this.bothDates);
    console.log(this.bothDates[0]);
    let now = moment().format('LLLL');
    console.log(now);
    let x = moment(this.bothDates[0]).valueOf();
    console.log(x);
    let y = moment(x).format('DD MM YYYY');
    console.log(y);

    let firstDate = moment(this.bothDates[0]).valueOf();
    let secondDate = moment(this.bothDates[1]).valueOf();
    console.log(firstDate);
    console.log(secondDate);



    if (firstDate === secondDate) {
      secondDate = firstDate  + 86400000;
      firstDate = firstDate - 2000000;

    }
  }

}
