import { Colaborator } from 'src/app/core/models/colaborator';
import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { AccountServiceService } from 'src/app/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { faSearch, faEuroSign, faPercentage, faCalculator, faCalendarAlt, faBalanceScaleRight, faUser, faUsers, faEye } from '@fortawesome/free-solid-svg-icons';
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
faEye = faEye;

state: string;
selectedSimulations: any;
selectedValue = 6;
public keys;
rows = [];
temp = [];
data = [];
 // DATE VARIABLES //
 bothDates: any;
 // DATE VARIABLES //
allData = [];
 toFilterByDate: any = [];

 tempMail = this.accountService.getCurrentEmail();

 public allSims$:  ReplaySubject<any> = new ReplaySubject();
 account: any = {};
@ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;


  constructor( private accountService: AccountServiceService, private localeService: BsLocaleService, private simulationService: SimulationService) {
    //Columns
    this.keys = [
      {prop: 'data'},
      {prop: 'user'},
      {prop: 'name'},
      {prop: 'simulation'},
      {prop: 'marginPercentage'},
      {prop: 'dailyRate'},
      {prop: 'anualRate'},
      {prop: 'anualTotalCost'}
    ]
    this.allSims$ = this.simulationService.allSims$;
    this.allSims$.subscribe( res => {
      this.toFilterByDate = res;
      this.allData = res;
      this.prepareData(res);
    });
  }

  ngOnInit() {
    this.state = 'simList';
    this.data = [];
    this.selectedSimulations = [];
    this.simulationService.getAllSimulations();

    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  prepareData(data) {
    data.forEach( (element: any) => {

      if (element.colaborators.length > 0) {
        element.colaborators.forEach(col => {

          if (col.simulations.length > 0) {
            col.simulations.forEach(simulation => {
              this.account.user = element.name;
              this.account.name = col.name;
              this.account.simulation = simulation.id;
              this.account.date = moment(simulation.date).format('DD-MM-YYYY');
              simulation.simFieldsData.forEach(field => {
                  this.account[field.name] = field.value;
                });
           });
            this.data.unshift({...this.account});
            this.account = {};
          }
        });
      }
    });
   // this.toFilterByDate = this.data;
    this.rows = this.data;

  }

  search(event) {
    const val = event.target.value.toLowerCase();
    // filter data
    // tslint:disable-next-line: only-arrow-functions
    this.temp = this.data.filter( function(d) {
      return d.user.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = this.temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  filterByDate() {
    this.data = [];
    let firstDate = moment(this.bothDates[0]).valueOf();
    let secondDate = moment(this.bothDates[1]).valueOf();
    console.log(firstDate, secondDate);

    if (firstDate === secondDate) {
      let date = new Date();
      console.log(firstDate);
      let hours = date.getHours();
      console.log(hours);

      firstDate -= hours*3600000;
      secondDate = firstDate + 86400000;
    }

    this.simulationService.retrieveSimulationsByDate(firstDate, secondDate).subscribe( res => {
      console.log(res);
      this.allSims$.next(res);
    })
   /*  console.log(this.toFilterByDate);
    // let dateInMilli: any = [];
    this.toFilterByDate.forEach(account => {
      console.log('account', account);
      account.colaborators = account.colaborators.filter( colaborator => colaborator.simulations.length > 0);
    });
    console.log(this.toFilterByDate);
    console.log('first',firstDate);
    console.log('second',secondDate);
    let filteredSimsByDate: any = [];
    this.toFilterByDate.forEach(accountFilter => {
      accountFilter.colaborators.forEach(colaboratorFilter => {
        colaboratorFilter.simulations = colaboratorFilter.simulations.filter( simulation => simulation.date > firstDate &&  simulation.date < secondDate )
      });
    });

    console.log(this.toFilterByDate)
   /*  for (let j = 0; j < this.toFilterByDate.length; j++) {

      for (let l = 0 ; l < this.toFilterByDate[j].colaborators.length; l++) {

        // tslint:disable-next-line: max-line-length
        if (this.toFilterByDate[j].colaborators[l].simulations[0].date > firstDate && this.toFilterByDate[j].colaborators[l].simulations[0].date < secondDate) {
         // console.log("entra"+j);
         // console.log(moment(this.toFilterByDate[j].colaborators[l].simulations[0].date).valueOf());
          filteredSimsByDate.push(this.toFilterByDate[j]);
        }
      }
    }
    //filteredSimsByDate = this.filterRepetition(filteredSimsByDate);
    //console.log(filteredSimsByDate);
    this.prepareData(this.toFilterByDate); */
    // Table with Filtered Data by Date //
  }

  clickRow(row, event) {
    //push to array when check and remove from array when undo check
    if (event.target.checked) {
      this.selectedSimulations.push(row);
    } else {
      for (let index = 0; index < this.selectedSimulations.length; index++) {
        const element = this.selectedSimulations[index];
        if (element.simulation == row.simulation) {
          this.selectedSimulations.splice(index, 1);
        }
      }
    }
  }

  viewSim(row) {
    this.selectedSimulations.push(row);
    this.state = 'simDetail';
  }

  compareSims() {
    this.state = 'simDetail';
  }

  goBack() {
    this.selectedSimulations = [];
    this.state = 'simList';
  }

  filterRepetition(filteredSimsByDate) {
    const result = [];
    const duplicatesIndices = [];

    // Loop through each item in the original array
    filteredSimsByDate.forEach((current, index) => {

      if (duplicatesIndices.includes(index)) return;

      result.push(current);

      // Loop through each other item on array after the current one
      for (let comparisonIndex = index + 1; comparisonIndex < filteredSimsByDate.length; comparisonIndex++) {

        const comparison = filteredSimsByDate[comparisonIndex];
        const currentKeys = Object.keys(current);
        const comparisonKeys = Object.keys(comparison);

        // Check number of keys in objects
        if (currentKeys.length !== comparisonKeys.length) continue;

        // Check key names
        const currentKeysString = currentKeys.sort().join("").toLowerCase();
        const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
        if (currentKeysString !== comparisonKeysString) continue;

        // Check values
        let valuesEqual = true;
        for (let i = 0; i < currentKeys.length; i++) {
          const key = currentKeys[i];
          if (current[key] !== comparison[key]) {
            valuesEqual = false;
            break;
          }
        }
        if (valuesEqual) duplicatesIndices.push(comparisonIndex);

      } // end for loop

    }); // end arr.forEach()
    return result;
  }
}
