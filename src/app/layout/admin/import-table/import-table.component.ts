import { Component, OnInit, ViewChild } from '@angular/core';

import { faSave } from '@fortawesome/free-solid-svg-icons';

import { BehaviorSubject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpClient } from '@angular/common/http';
import { ExcelServiceService } from 'src/app/core/services';

@Component({
  selector: 'app-import-table',
  templateUrl: './import-table.component.html',
  styleUrls: ['./import-table.component.scss']
})
export class ImportTableComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  iconSave = faSave;
  title = 'ExcelExample';
  columns: any = [];
  rows: any = [];
  temp: any = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  file: File;
  select: String;

  constructor(
    private excelService: ExcelServiceService,
    private http: HttpClient
  ) {
    this.columns = [
      { prop: 'remuneracao_mensal' },
      { prop: 'zero' },
      { prop: 'um' },
      { prop: 'dois' },
      { prop: 'tres' },
      { prop: 'quatro' },
      { prop: 'cinco' },
      { prop: 'n_titulares_rendimento' }
    ];
  }

  ngOnInit(): void {

  }

  /*exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.rows, 'sample');
  } */

  saveInDB(){
    this.excelService.saveInDB(this.rows).subscribe( data => console.log(data));  
  }

  incomingfile(event) {
    this.file = event.target.files[0];
  }

  importExcel() {
    this.select = "botao";
    this.isLoading$.next(true);
    this.excelService.importExcelFile(this.file).subscribe(
      (response: any[]): void => {
        this.checkData(response);
      },
      (error): void => {
        console.log(error);
      },
      (complete) => {
        this.isLoading$.next(false);
      });
  }

  checkData(response) {
    console.log(response);
    let i: number;
    let tipo: string;
    let x = (Object.keys(response[1])[0]);
    for (i = 0; i < response.length; i++) {
      if (Object.keys(response[i]).length != 8) {
        if (response[i][x] == "NÃO CASADO") {
          tipo = "NÃO CASADO";
          response.splice(response[i], 1);
        }
        if (response[i][x] == "CASADO UNICO TITULAR") {
          tipo = "CASADO UNICO TITULAR";
          response.splice(response[i], 1);
        }
        if (response[i][x] == "CASADO DOIS TITULARES") {
          tipo = "CASADO DOIS TITULARES";
          response.splice(response[i], 1);
        }
        if (response[i][x] == "NÃO CASADO - DEFICIENTE") {
         break;
        }
      }
      if (Object.keys(response[i]).length == 8 && Number.isInteger(response[i].__EMPTY )) {
        let obj = {
          remuneracao_mensal: response[i].__EMPTY,
          zero: response[i].__EMPTY_1,
          um: response[i].__EMPTY_2,
          dois: response[i].__EMPTY_3,
          tres: response[i].__EMPTY_4,
          quatro: response[i].__EMPTY_5,
          cinco: response[i].__EMPTY_6,
          n_titulares_rendimento: tipo
        }
        this.temp.push(obj);
      }
    }
    // console.log(response);
    this.rows = this.temp; 
    console.log(this.rows);
    // this.data = this.rows;
  }

}
