import { Extras } from './../../../core/models/extras';
import { Taxation } from './../../../core/models/taxation';
import { Margin } from './../../../core/models/margin';
import { FoodSubsidy } from './../../../core/models/foodSubsidy';
import { WorkInsurance } from 'src/app/core/models/workInsurance';
import { Component, OnInit } from '@angular/core';
import { SimulationFields } from 'src/app/core/models/simulationFields';
import { SimFieldsData } from 'src/app/core/models/simFieldsData';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';
import { ReplaySubject } from 'rxjs';
import { DataService } from 'src/app/core/services/data-service/data.service';
//import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-sim-manag',
  templateUrl: './sim-manag.component.html',
  styleUrls: ['./sim-manag.component.scss']
})
export class SimManagComponent implements OnInit {

  simFieldsData = new SimFieldsData();
  showForm = true;
  //public fields$: ReplaySubject<SimulationFields[]>;
  subAlim;


  workInsuranceVariable: number;
  varAccountedForWorkInsurance: number;



  foodSubsidyMonth: number;
  averageDaysOfTheMonth: number;
  limitValueForFoodSubsidy: number;



  // tslint:disable-next-line: variable-name
  margin_min: number;
  // tslint:disable-next-line: variable-name
  margin_max: number;


  workerSocialSecurity: number;
  companySocialSecurity: number;
  autonomousTributation: number;

  receiveWorkInsurance$ = new ReplaySubject<WorkInsurance[]>();
  foodSubsidy$ = new ReplaySubject<FoodSubsidy[]>();
  marginValues$ = new ReplaySubject<Margin[]>();
  // tslint:disable-next-line: variable-name
  taxation$ = new ReplaySubject<Taxation[]>();

  extraName: string;
  extraWithAutonomousTributation: boolean;

  constructor(
    private simulationService: SimulationService,
    private dataService: DataService
  ) {

    this.foodSubsidy$ = this.simulationService.foodSubsidy$;
    this.marginValues$ = this.simulationService.marginValues$;
    this.taxation$ = this.simulationService.taxation$;
    this.receiveWorkInsurance$ = this.simulationService.receiveworkInsurance$;
  }

  ngOnInit() {
    this.foodSubsidy$.subscribe( (foodSubsidyValue: any) => {
      console.log(foodSubsidyValue);
      this.foodSubsidyMonth = foodSubsidyValue.foodSubsidyMonth;
      this.limitValueForFoodSubsidy = foodSubsidyValue.limitValueForFoodSubsidy;
      this.averageDaysOfTheMonth = foodSubsidyValue.averageDaysOfTheMonth;
    })
    this.marginValues$.subscribe( (marginValue: any) => {
      console.log(marginValue);
      this.margin_min = marginValue[0].margin_min;
      this.margin_max = marginValue[0].margin_max;
    })
    this.taxation$.subscribe( (taxationValue: any) => {
      console.log(taxationValue);
      this.autonomousTributation = taxationValue[0].value;
      this.workerSocialSecurity = taxationValue[1].value;
      this.companySocialSecurity = taxationValue[2].value;
    })
    this.receiveWorkInsurance$.subscribe( (receiveWorkInsuranceValue: any) => {
      console.log(receiveWorkInsuranceValue);
      this.varAccountedForWorkInsurance = receiveWorkInsuranceValue.varAccountedForWorkInsurance;
      this.workInsuranceVariable = receiveWorkInsuranceValue.workInsuranceVariable;

    })
  }

  resultFoodSubsidy(event) {
    this.foodSubsidyMonth = Number((this.averageDaysOfTheMonth * this.limitValueForFoodSubsidy).toFixed(2));
  }

  newTributationValues() {
    const newTributationValues = [];
    newTributationValues.push({name: "autonomousTributation", value: this.autonomousTributation});
    newTributationValues.push(this.workerSocialSecurity);
    newTributationValues.push(this.companySocialSecurity);
    console.log(newTributationValues);
  }

  newMarginValues() {
    // tslint:disable-next-line: new-parens
    const newMarginValues = new Margin;
    newMarginValues.margin_min = this.margin_min;
    newMarginValues.margin_max = this.margin_max;
    console.log(newMarginValues);
    this.dataService.postNewMarginValues(newMarginValues);
    console.log(this.dataService.postNewMarginValues(newMarginValues));

  }

  newFoodSubsidyValues() {
    // tslint:disable-next-line: new-parens
    const newFoodSubsidyValues = new FoodSubsidy;
    newFoodSubsidyValues.averageDaysOfTheMonth = this.averageDaysOfTheMonth;
    newFoodSubsidyValues.limitValueForFoodSubsidy = this.limitValueForFoodSubsidy;
    newFoodSubsidyValues.foodsubsidymonth = this.foodSubsidyMonth;
    console.log(newFoodSubsidyValues);
    this.dataService.putNewFoodSubsidyValue(newFoodSubsidyValues);
  }

  newExtra() {
    // tslint:disable-next-line: new-parens
    const newExtra = new Extras;
    newExtra.name = this.extraName;
    newExtra.tA = this.extraWithAutonomousTributation;
    console.log(newExtra);
    this.dataService.postNewExtra(newExtra);
  }


}
