import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, TemplateRef } from '@angular/core';
import { AccountServiceService } from 'src/app/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
  
  constructor(private accountService: AccountServiceService, private modalService: BsModalService) { }

  ngOnInit() {
    if (this.data.length > 0) {
      this.keys = Object.keys(this.data[0]);
    }
    
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

  clickRow(row) {
    this.clickedRow.emit(row);
  }

  search() { /* 
    var $rows = $('#favoritos-body tr'); 
    console.log($rows); $('#search').keyup(function () { var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase(); 
    $rows.show().filter(function () { var text = $(this).text().replace(/\s+/g, ' ').toLowerCase(); 
    return !~text.indexOf(val); }).hide(); }); } */
  
  }

}