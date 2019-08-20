import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AccountServiceService } from 'src/app/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Input() header: any;
  @Input() data: any[];
  @Output() clickedRow = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  public keys;
  dataSub = [];
  modalRef: BsModalRef;
  state: string;
  emailToDelete;
  faSearch = faSearch;
  temp = [];
  rows = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private modalService: BsModalService) { 
    this.keys = [
      {prop: 'name'},
      {prop: 'email'}
    ]
    }
  

  ngOnInit() {
    this.temp = this.data;
    this.rows = this.temp;
    
  }

  showConfirmModal(template: TemplateRef<any>, row) {
    console.log(row);
    this.emailToDelete = row.email;
    this.state = 'deleteAccount'
    this.modalRef = this.modalService.show(template);
    //this.modalRef.content.email = row.email;
  }

  onCloseModal() { 
    this.modalRef.hide();
  }

  cancel() {
    this.modalRef.hide();
  }

  delete(){
    this.state = 'confirm';
    this.onDelete.emit(this.emailToDelete);
  }

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