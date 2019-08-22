import { FoodSubsidy } from './../../models/foodSubsidy';
import { WorkInsurance } from './../../models/workInsurance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    this.http.post('http://localhost:8080/simuladorsalarial/api/taxes/', data);
  }

  // EXTRAS //

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
    this.http.post('http://localhost:8080/simuladorsalarial/api/simulationfields/', workInsurance);
  }

  // MARGIN //

  retrieveMarginValues(margin) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/margin/', margin);
  }

  postNewMarginValues(margin) {
    console.log("entrei")
    console.log(margin);
    return this.http.post('http://localhost:8080/simuladorsalarial/api/margin/newvalue', margin);
  }


  // FOOD SUBSIDY //

  retrieveFoodSubsidyValue(foodSubsidyMonth) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/foodsubsidy/', foodSubsidyMonth);
  }

  putNewFoodSubsidyValue(foodSubsidyMonth) {
    this.http.put('http://localhost:8080/simuladorsalarial/api/foodsubsidy/newvalue', foodSubsidyMonth);

  }
  retriveWorkInsuranceVariable(workIns) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/workinsurance/', workIns);
  }


  // SAVE SIMULATOR IN DATA BASE //

  postSimulation(simulation, colaboratorId) {
    this.http.post('http://localhost:8080/simuladorsalarial/api/simulations/' + colaboratorId, simulation);
  }

}

