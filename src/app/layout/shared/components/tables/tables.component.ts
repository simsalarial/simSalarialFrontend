import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AccountServiceService } from 'src/app/core';

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

  constructor(private accountService: AccountServiceService) { }

  ngOnInit() {
    if (this.data.length > 0) {
      this.keys = Object.keys(this.data[0]);
    }
    
  }

  delete(row){
    console.log(row.email);
    this.onDelete.emit(row.email);
  }


  clickRow(row) {
    this.clickedRow.emit(row);
  }

  
  

}