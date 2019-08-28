import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faSearch, faEuroSign, faPercentage, faUser, faEye, faCalculator, faBalanceScaleRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountServiceService } from 'src/app/core';
import { ReplaySubject } from 'rxjs';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import * as moment from 'moment';



@Component({
  selector: 'app-sim-list',
  templateUrl: './sim-list.component.html',
  styleUrls: ['./sim-list.component.scss']
})
export class SimListComponent implements OnInit {
  @Input() header: any;
  @Output() clickedRow = new EventEmitter();
  //@Output() onDelete = new EventEmitter();
  //simToDelete;
  //modalRef: BsModalRef;

  faSearch = faSearch;
  faEuroSign = faEuroSign;
  faPercentage = faPercentage;
  faCalculator = faCalculator;
  faCalendarAlt = faCalendarAlt;
  faBalanceScaleRight = faBalanceScaleRight;
  faEye = faEye;
  faUser = faUser;
  public keys;
  dataSub = [];
  state: string;
  rows = [];
  temp = [];
  data = [];
  colaborator: any = {};
  msg: string;
  public simByEmail$: ReplaySubject<any> = new ReplaySubject();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  // DATE VARIABLES //
  bothDates: any;
  // DATE VARIABLES //
  selectedSimulations: any;
  selectedValue = 6;

  checked = false;


  tempMail = this.accountService.getCurrentEmail();
  toFilterByDate: any = [];
  count = 0;

  isDisabled = false;



  constructor(private modalService: BsModalService, private accountService: AccountServiceService, private localeService: BsLocaleService) {


    this.keys = [
      { prop: 'date' },
      { prop: 'name' },
      { prop: 'simulation' },
      { prop: 'marginPercentage' },
      { prop: 'anualRate' },
      { prop: 'anualTotalCost' },
      { prop: 'netSalaryWithoutDuo' },
      { prop: 'netSalaryWithDuo' },
      { prop: 'dailyRate' },
      { prop: 'view' }
    ]
    this.simByEmail$ = this.accountService.simByEmail$;
    this.simByEmail$.subscribe(res => {
      console.log(res);
      this.toFilterByDate = res;
      res.forEach((element: any) => {

        if (element.simulations.length > 0) {

          element.simulations.forEach(simulation => {
            this.colaborator.name = element.name;
            this.colaborator.simulation = simulation.id;
            this.colaborator.date = moment(simulation.date).format('DD-MM-YYYY');
            simulation.simFieldsData.forEach(field => {
              this.colaborator[field.name] = field.value;
            });
            this.data.push({ ...this.colaborator });
            this.colaborator = {};
          });
        }

      });
      console.log(this.data);
      this.rows = this.data;
    });
  }


  ngOnInit() {
    console.log("AQUI");
    this.data = [];
    this.selectedSimulations = [];
    this.state = 'simList';
    // this.rows = this.temp;
    let email = this.accountService.getCurrentEmail();
    this.accountService.getAllSimulationsFromAccount(email);
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.rows = changes.temp.currentValue;
  }

  filterByDate() {
    let firstDate = moment(this.bothDates[0]).valueOf();
    let secondDate = moment(this.bothDates[1]).valueOf();

    if (firstDate === secondDate) {
      secondDate = firstDate + 86400000;
      firstDate = firstDate - 2000000;

    }

    let dateInMilli: any = [];

    for (let i = 0; i < this.toFilterByDate.length; i++) {
      if (this.toFilterByDate[i].simulations.length > 0) {
        dateInMilli.push(this.toFilterByDate[i]);
      }
    }
    console.log(dateInMilli);
    console.log(dateInMilli[0].simulations[0].date);

    console.log(firstDate);
    console.log(secondDate);
    let filteredSimsByDate: any = [];
    for (let j = 0; j < dateInMilli.length; j++) {
      console.log("AQUI");
      if (dateInMilli[j].simulations[0].date > firstDate && dateInMilli[j].simulations[0].date < secondDate) {
        console.log("entra" + j);
        console.log(moment(dateInMilli[j].date).valueOf());
        filteredSimsByDate.push(dateInMilli[j]);
      }
    }

    this.data = [];

    // Table with Filtered Data by Date //
    filteredSimsByDate.forEach((element: any) => {


      element.simulations.forEach(simulation => {
        this.colaborator.name = element.name;
        this.colaborator.simulation = simulation.id;
        this.colaborator.date = moment(simulation.date).format('DD-MM-YYYY');
        simulation.simFieldsData.forEach(field => {
          this.colaborator[field.name] = field.value;
        });
        this.data.push(this.colaborator);
        this.colaborator = {};
      });

    });

    console.log(this.data);
    this.rows = this.data;
  }


  /* showConfirmModal(template: TemplateRef<any>, row) {
    console.log(row);
    this.simToDelete = row.email;
    this.state = 'deleteAccount'
    this.modalRef = this.modalService.show(template);
    //this.modalRef.content.email = row.email;
  } */

  /* onCloseModal() {
    this.modalRef.hide();
  }

  cancel() {
    this.modalRef.hide();
  } */

  /* delete(){
    this.state = 'confirm';
   // this.onDelete.emit(this.emailToDelete);
   let email = this.simToDelete;
   this.accountService.deleteAccount(this.simToDelete).subscribe ((res:any) => {
    console.log(res);
    this.temp = this.temp.filter(function( obj ) {
      return obj.email !== email;
    });
    this.rows = this.temp;
    this.onDelete.emit(this.simToDelete);
  });
  } */

  search(event) {
    const val = event.target.value.toLowerCase();
    // filter data
    // tslint:disable-next-line: only-arrow-functions
    this.temp = this.data.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = this.temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  clickRow(row, event) {
    console.log(row);
    console.log(event);
    this.clickCount();
    //this.clickedRow.emit(row);
    if (event.target.checked) {
      this.selectedSimulations.push(row);
    } else {
      for (let index = 0; index < this.selectedSimulations.length; index++) {
        const element = this.selectedSimulations[index];
        if (element.simulation == row.simulation) {
          this.selectedSimulations.splice(index, 1);
          console.log(this.selectedSimulations)
        }
      }
    }

    console.log(this.selectedSimulations);
    this.selectedSimulations = this.checkForRepetitions();

  }

  compareSims() {
    console.log(this.selectedSimulations);
    this.state = 'simDetail';
  }

  viewSim(row) {
    console.log(row);
    this.selectedSimulations.push(row);
    console.log(this.selectedSimulations);
    this.state = 'simDetail';
  }

  goBack() {
    this.selectedSimulations = [];
    this.state = 'simList';
  }

  checkForRepetitions() {


    const selectedSimulationsWithoutRepetitions = [];
    const duplicatesIndices = [];

    // Loop through each item in the original array
    this.selectedSimulations.forEach((current, index) => {

      if (duplicatesIndices.includes(index)) return;

      selectedSimulationsWithoutRepetitions.push(current);

      // Loop through each other item on array after the current one
      for (let comparisonIndex = index + 1; comparisonIndex < this.selectedSimulations.length; comparisonIndex++) {

        const comparison = this.selectedSimulations[comparisonIndex];
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

    console.log(selectedSimulationsWithoutRepetitions);

    return selectedSimulationsWithoutRepetitions;
  }

  clickCount() {
    this.count++;
    console.log(this.count);
  }


}
