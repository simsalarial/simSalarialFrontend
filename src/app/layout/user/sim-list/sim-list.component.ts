import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faSearch, faEuroSign, faPercentage, faUser, faCalculator } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountServiceService } from 'src/app/core';
import { Colaborator } from 'src/app/core/models/colaborator';

@Component({
  selector: 'app-sim-list',
  templateUrl: './sim-list.component.html',
  styleUrls: ['./sim-list.component.scss']
})
export class SimListComponent implements OnInit {
  @Input() header: any;
  //@Input() temp: any[];
  @Output() clickedRow = new EventEmitter();
  //@Output() onDelete = new EventEmitter();
  //simToDelete;
  //modalRef: BsModalRef;
  faSearch = faSearch;
  faEuroSign = faEuroSign;
  faPercentage = faPercentage;
  faCalculator = faCalculator;
  faUser = faUser;
  public keys;
  dataSub = [];
  state: string;
  rows = [];
  temp = [];
  data = [];
  colaborator: any = {};
  msg: string;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private modalService: BsModalService, private accountService:AccountServiceService) { 
    this.keys = [
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
    //this.rows = this.temp;
    let email = this.accountService.getCurrentEmail();
    this.accountService.getAllSimulationsFromAccount(email).subscribe((res: any) => {
      console.log(res);
      
      res.forEach( (element: any) => {
        //this.colaborators[0].simulations[0] = element.simulations;
        /* this.simFields.forEach((field: any) => {
          console.log(element);
          const filtered = element.simulations.filter( el => el.name === field);
          console.log(filtered);
          
          this.colaborators.push(filtered[0].value);
        }); */
          element.simulations.forEach(simulation => {
            this.colaborator.name = element.name;
            this.colaborator.simulation = simulation.id;
            simulation.simFieldsData.forEach(field => {
              this.colaborator[field.name] = field.value;
            });
            this.data.push({...this.colaborator});
            this.colaborator = {};
          });
        });
        console.log(this.data);
        this.rows = this.data;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.rows = changes.temp.currentValue;
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
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


}
