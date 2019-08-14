import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columns: any = [];
  rows: any = [];
  temp: any = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  
  constructor() {
    this.columns = [
      { name: 'Comercial' },
      { name: 'Consultor' },
      { prop: 'simulacao_n' }
    ];
    this.temp = [{
      comercial: 'Rita',
      consultor: 'Jose',
      simulacao_n: 1
    },
    {
      comercial: 'Joana',
      consultor: 'Ze Manel',
      simulacao_n: 1
    },
    {
      comercial: 'Joana',
      consultor: 'Ze Manel',
      simulacao_n: 2
    }];
    this.rows = this.temp;
  }

  ngOnInit() {
  }

  updateFilter(event) {
    const filterAttr =  'comercial';
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d) => {
      return (d[filterAttr] != null) ? d[filterAttr].toLowerCase().indexOf(val) !== -1 : false;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

}
