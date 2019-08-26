import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faSearch, faEuroSign, faPercentage, faUser, faCalculator, faBalanceScaleRight} from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountServiceService } from 'src/app/core';
import { ReplaySubject } from 'rxjs';

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
  public simByEmail$:  ReplaySubject<any> = new ReplaySubject();
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  first2Date: any;
  selectedSimulations: any;

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
   this.simByEmail$ = this.accountService.simByEmail$;
   this.simByEmail$.subscribe( res => {
    console.log(res);
    
      res.forEach( (element: any) => {
        
        if(element.simulations.length > 0) {

          element.simulations.forEach(simulation => {
            this.colaborator.name = element.name;
            this.colaborator.simulation = simulation.id;
            simulation.simFieldsData.forEach(field => {
              this.colaborator[field.name] = field.value;
            });
            this.data.push({...this.colaborator});
            this.colaborator = {};
          });
        }
          
        });
        console.log(this.data);
        this.rows = this.data;
      })
    }

  ngOnInit() {
    this.data = [];
    this.selectedSimulations = [];
    this.state = 'simList';
    //this.rows = this.temp;
    let email = this.accountService.getCurrentEmail();
    this.accountService.getAllSimulationsFromAccount(email);

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.rows = changes.temp.currentValue;
  }

  testing() {
    console.log(this.first2Date);

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
    this.rows = this.rows.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    //this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
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
