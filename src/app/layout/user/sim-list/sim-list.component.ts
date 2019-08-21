import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountServiceService } from 'src/app/core';

@Component({
  selector: 'app-sim-list',
  templateUrl: './sim-list.component.html',
  styleUrls: ['./sim-list.component.scss']
})
export class SimListComponent implements OnInit {
  @Input() header: any;
  @Input() temp: any[];
  @Output() clickedRow = new EventEmitter();
  //@Output() onDelete = new EventEmitter();
  public keys;
  dataSub = [];
  modalRef: BsModalRef;
  state: string;
  //simToDelete;
  faSearch = faSearch;
  //temp = [];
  rows = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private modalService: BsModalService, private accountService:AccountServiceService) { 
    this.keys = [
      {prop: 'colaborator'},
      {prop: 'simulation'},
      {prop: 'margin'},
      {prop: 'rate'},
      {prop: 'anualTotalCost'},
      {prop: 'netSalary'}
    ]
    }
  
  ngOnInit() {
    //this.temp = this.data;
    this.rows = this.temp;
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
