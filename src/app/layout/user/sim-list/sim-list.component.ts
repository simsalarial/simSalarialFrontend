import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faSearch, faEuroSign, faPercentage, faUser, faCalculator, faBalanceScaleRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
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
      { prop: 'netSalaryWithDuo' }
    ]
    this.simByEmail$ = this.accountService.simByEmail$;
    this.simByEmail$.subscribe(res => {
      console.log(res);

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
      secondDate = firstDate + 86400000;
      firstDate = firstDate - 2000000;

    }

    this.accountService.getAllSimulationsByDate(firstDate, secondDate, this.tempMail).subscribe((res => {
      console.log(this.tempMail);
      console.log(firstDate);
      console.log(secondDate);
      console.log(res);
    }));





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

  clickRow(row) {
    console.log(row);
    this.clickCount();
    //this.clickedRow.emit(row);
    this.selectedSimulations.push(row);
    console.log(this.selectedSimulations);
    this.selectedSimulations = this.checkForRepetitions();

  }

  compareSims() {
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

  clickCount(){
    this.count++;
    console.log(this.count);
  }


}
