import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }






  retrieveDataServiceTaxes(data) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/taxes/all', data);
  }

  postNewTaxes(data) {
    this.http.post('http://localhost:8080/simuladorsalarial/api/taxes/', data);
  }

  retrieveDataServiceExtras(extras) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/simulationfields/', extras);
  }

  postNewExtra(extra) {
    this.http.post('http://localhost:8080/simuladorsalarial/api/extras', extra);
  }

  retriveWorkInsuranceVariable(workIns) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/workinsurance/', workIns);
  }


}

