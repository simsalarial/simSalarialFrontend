import { FoodSubsidy } from './../../models/foodSubsidy';
import { WorkInsurance } from './../../models/workInsurance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }


  // TAXES //

  retrieveDataServiceTaxes(data) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/taxes/all', data);
  }

  postNewTaxes(data) {
    return this.http.post('http://localhost:8080/simuladorsalarial/api/taxes/', data);
  }

  // EXTRAS //

  getAllExtras() {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/simulationfields/', {responseType: 'json'});
  }

  retrieveDataServiceExtras(extras) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/simulationfields/', extras);
  }

  postNewExtra(extra) {
    return this.http.post('http://localhost:8080/simuladorsalarial/api/simulationfields', extra,  {responseType: 'text'});
  }

  deleteExtra(extra) {
    return this.http.delete('http://localhost:8080/simuladorsalarial/api/simulationfields/' + extra,  {responseType: 'text'});
  }

  // WORK INSURANCE //

  // tslint:disable-next-line: no-shadowed-variable
  retrieveWorkInsurance(workInsurance) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/workinsurance', workInsurance);
  }

  postNewWorkInsuranceVariables(workInsurance) {
    return this.http.put('http://localhost:8080/simuladorsalarial/api/workinsurance/1', workInsurance);
  }

  retriveWorkInsuranceVariable(workIns) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/workinsurance/', workIns);
  }

  // MARGIN //

  retrieveMarginValues(margin) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/margin/', margin);
  }

  postNewMarginValues(margin) {
    return this.http.put('http://localhost:8080/simuladorsalarial/api/margin/1', margin);
  }


  // FOOD SUBSIDY //

  retrieveFoodSubsidyValue(foodSubsidyMonth) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/foodsubsidy/', foodSubsidyMonth);
  }

  putNewFoodSubsidyValue(foodSubsidyMonth) {
    return this.http.put('http://localhost:8080/simuladorsalarial/api/foodsubsidy/newvalue', foodSubsidyMonth);

  }



  // SAVE SIMULATION IN DATA BASE //

  postSimulation(simulation, colaboratorId) {
    return this.http.post('http://localhost:8080/simuladorsalarial/api/simulations/' + colaboratorId, simulation);
  }

}

