import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { AccountServiceService } from 'src/app/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { faSearch, faEuroSign, faPercentage, faCalculator, faCalendarAlt, faBalanceScaleRight, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-sim-list',
  templateUrl: './sim-list.component.html',
  styleUrls: ['./sim-list.component.scss']
})
export class SimListComponent implements OnInit {
@Input() simulation: any;
@Output() colNumber = 'col-10';
faSearch = faSearch;
faUsers = faUsers;
faEuroSign = faEuroSign;
faPercentage = faPercentage;
faCalculator = faCalculator;
faCalendarAlt = faCalendarAlt;
faBalanceScaleRight = faBalanceScaleRight;
faUser = faUser;

state: string;
selectedSimulations: any;

public keys;
rows = [];
temp = [];
data = [];
 // DATE VARIABLES //
 bothDates: any;
 // DATE VARIABLES //

 tempMail = this.accountService.getCurrentEmail();

 public allSims$:  ReplaySubject<any> = new ReplaySubject();
 account: any = {};
@ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;


  constructor( private accountService: AccountServiceService, private localeService: BsLocaleService, private simulationService: SimulationService) {
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
    this.allSims$ = this.simulationService.allSims$;
    this.allSims$.subscribe( res => {
      console.log(res);
  
      res.forEach( (element: any) => {
  
          if (element.colaborators.length > 0) {
            element.colaborators.forEach(col => {
            
              if (col.simulations.length > 0) {
                col.simulations.forEach(simulation => {
                  this.account.user = element.email;
                  this.account.name = col.name;
                  this.account.simulation = simulation.id;
                    simulation.simFieldsData.forEach(field => {
                      this.account[field.name] = field.value;
                    });
               });
               this.data.push({...this.account});
               this.account = {};
              }
            });
          }
          
      });
      console.log(this.data);
      this.rows = this.data;
    });
  }

  ngOnInit() {
    this.state = 'simList';
    this.data = [];
    this.selectedSimulations = [];
    this.simulationService.getAllSimulations();

    /* let email = this.accountService.getCurrentEmail();
    this.accountService.getAllSimulationsFromAccount(email); */

    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  search(event) {
    const val = event.target.value.toLowerCase();
    // filter data
    // tslint:disable-next-line: only-arrow-functions
    this.temp = this.data.filter( function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = this.temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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


  clickRow(row) {
    console.log(row);
    //this.clickedRow.emit(row);
    this.selectedSimulations.push(row);

  }

  compareSims() {
    console.log(this.selectedSimulations);
    this.state = 'simDetail';
  }
}
