import { Injectable } from '@angular/core';
import { WorkInsurance } from '../../models/workInsurance';
import { FoodSubsidy } from '../../models/foodSubsidy';
import { Margin } from '../../models/margin';
import { Taxation } from '../../models/taxation';
import { DataService } from '../data-service/data.service';
import { Observable, ReplaySubject } from 'rxjs';
import { SimulationByPerson } from '../../models/simulationByPerson';
import { HttpClient } from '@angular/common/http';
import { Extras } from '../../models/extras';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  receiveworkInsuranceVariable = new Array<WorkInsurance>();
  foodSubsidy = new Array<FoodSubsidy>();
  marginValues = new Array<Margin>();
  taxation = new Array<Taxation>();
  extras = new Array<Extras>();

  receiveworkInsurance$ = new ReplaySubject<WorkInsurance[]>();
  foodSubsidy$ = new ReplaySubject<FoodSubsidy[]>();
  marginValues$ = new ReplaySubject<Margin[]>();
  taxation$ = new ReplaySubject<Taxation[]>();
  extras$ = new ReplaySubject<Extras[]>();
  public allSims$:  ReplaySubject<any> = new ReplaySubject();

  constructor(
    private dataService: DataService,
    private readonly http: HttpClient
  ) { }


  getSimulationsByPerson(): Observable<SimulationByPerson[]> {
    return this.http.get<SimulationByPerson[]>("http://localhost:8080/simuladorsalarial/api/simulations");
  }

  getAllSimulations() {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/accounts/allSimsForAccounts', {responseType: "json"}).subscribe((res: any) => {
      console.log(res);
      this.allSims$.next(res);
   });
  }

  getSimulationById(id) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/simulations/'+ id, {responseType: "text"} );
  }

  importDataBaseData() {
    // GET EXTRAS //
    this.dataService.retrieveDataServiceExtras(this.extras).subscribe((extrasRes) => {
      Object.assign(this.extras, extrasRes);
      this.divideExtrasByTributation(this.extras);
    });
    // GET EXTRAS //

    // GET OVERALL TAXES //
    this.dataService.retrieveDataServiceTaxes(this.taxation).subscribe((taxRes) => {
     // tslint:disable-next-line: no-unused-expression
     // taxRes;
     Object.assign(this.taxation, taxRes);
     this.parseTaxationToIndividualValue(this.taxation);
   });
   // GET OVERALL TAXES //

   // WORK INSURANCE VARIABLES //
    this.dataService.retrieveWorkInsurance(this.receiveworkInsuranceVariable).subscribe((workInsRes) => {
     Object.assign(this.receiveworkInsuranceVariable, workInsRes);
     this.resolveWorkInsuranceVariables(this.receiveworkInsuranceVariable);
   });
   // WORK INSURANCE VARIABLES //


   // MARGIN MIN AND MAX //
    this.dataService.retrieveMarginValues(this.marginValues).subscribe((marginRes) => {
     Object.assign(this.marginValues, marginRes);
     this.resolveMarginValues(this.marginValues);
   });
   // MARGIN MIN AND MAX //

   // FOODSUBSIDY VALUES //
    this.dataService.retrieveFoodSubsidyValue(this.foodSubsidy).subscribe((foodSubsidyRes) => {
     Object.assign(this.foodSubsidy, foodSubsidyRes);
     this.resolveFoodSubsidyValue(this.foodSubsidy);

   });
   // FOODSUBSIDY VALUES //

  }

  parseTaxationToIndividualValue(taxes) {
   //console.log(taxes);
    this.taxation$.next(taxes);
  }

  resolveWorkInsuranceVariables(workInsuranceVariables) {
   //console.log(workInsuranceVariables);
    this.receiveworkInsurance$.next(workInsuranceVariables);
  }

  resolveMarginValues(marginValues) {
   //console.log(marginValues);
    this.marginValues$.next(marginValues);
  }

  resolveFoodSubsidyValue(foodSubsidyValues) {
   //console.log(foodSubsidyValues);
    this.foodSubsidy$.next(foodSubsidyValues);
  }

  divideExtrasByTributation(newExtras) {
    //console.log(newExtras);
    this.extras$.next(newExtras);
  }


}
