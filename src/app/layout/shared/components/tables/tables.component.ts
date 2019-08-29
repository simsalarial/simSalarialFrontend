import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { AccountServiceService } from 'src/app/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Input() header: any;
  @Input() temp: any[];
  @Output() clickedRow = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  public keys;
  dataSub = [];
  modalRef: BsModalRef;
  state: string;
  emailToDelete;
  faSearch = faSearch;
  faTrashAlt = faTrashAlt;
  rows = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  selectedValue=6;

  constructor(private modalService: BsModalService, private accountService:AccountServiceService) { 
    this.keys = [
      {prop: 'name', width: +100},
      {prop: 'email', width: +100},
      {prop: '', width: -200}
    ]
    }
  
  ngOnInit() {
    this.rows = this.temp;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.rows = changes.temp.currentValue;
  }

  showConfirmModal(template: TemplateRef<any>, row) {
    this.emailToDelete = row.email;
    this.state = 'deleteAccount'
    this.modalRef = this.modalService.show(template);
  }

  onCloseModal() { 
    this.modalRef.hide();
  }

  cancel() {
    this.modalRef.hide();
  }

  delete(){
    this.state = 'confirm';
    let email = this.emailToDelete;
    this.accountService.deleteAccount(this.emailToDelete).subscribe ((res:any) => {
    this.temp = this.temp.filter(function( obj ) {
      return obj.email !== email;
    });
    this.rows = this.temp;
    this.onDelete.emit(this.emailToDelete);
  });
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