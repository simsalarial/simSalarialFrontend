import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  @Input() header: any;
  @Input() data: any;
  @Output() clickedRow = new EventEmitter();
  public keys;


  constructor() { }

  ngOnInit() {
    this.keys = Object.keys(this.data[0]);
  }

  clickRow(row) {
    this.clickedRow.emit(row);
  }

  delete(row) {
    
  }

}