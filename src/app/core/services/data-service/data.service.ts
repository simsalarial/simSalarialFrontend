import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }






  retrieveDataServiceTaxes(data) {
    console.log(data);
    return this.http.get('http://localhost:8080/simuladorsalarial/api/taxation', data);
  }

  retrieveDataServiceExtras(extras) {
    console.log(extras);
    return this.http.get('http://localhost:8080/simuladorsalarial/api/extras', extras);
  }

  postNewExtra(extra) {
    this.http.post('http://localhost:8080/simuladorsalarial/api/extras', extra);
  }

 postNewTaxes(data) {
   this.http.post('http://localhost:8080/simuladorsalarial/api/taxation', data);
 }

}

