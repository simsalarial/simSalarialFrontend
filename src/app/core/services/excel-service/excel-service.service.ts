import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {
  arrayBuffer: any;

  constructor(private http: HttpClient) {

  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_date_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  saveInDB(data){
    console.log(data);
    return this.http.post('http://localhost:8080/simuladorsalarial/api/irstable',data)
  }

  retrieveFromDB(colaborator){
      return this.http.post('http://localhost:8080/simuladorsalarial/api/irstable/filtertable', colaborator)
  }

  public importExcelFile(file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    return Observable.create((observer: Subscriber<any[]>): void => {
      fileReader.onload = (e) => {
        this.arrayBuffer = fileReader.result;
        const data = new Uint8Array(this.arrayBuffer);
        const arr = new Array();
        for (let i = 0; i !== data.length; ++i) { arr[i] = String.fromCharCode(data[i]); }
        const bstr = arr.join('');
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const result = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        observer.next(result);
        observer.complete();
      };
      fileReader.onerror = (error): void => {
        observer.error(error);
      };
    });
  }
}
