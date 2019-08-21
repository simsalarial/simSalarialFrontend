import { Taxation } from './../../../core/models/taxation';
import { Margin } from './../../../core/models/margin';
import { FoodSubsidy } from './../../../core/models/foodSubsidy';
import { WorkInsurance } from 'src/app/core/models/workInsurance';
import { Component, OnInit } from '@angular/core';
import { SimulationFields } from 'src/app/core/models/simulationFields';
import { SimFieldsData } from 'src/app/core/models/simFieldsData';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';
import { ReplaySubject } from 'rxjs';
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
  averageDaysInAMonth: number;
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


  constructor(
    private simulationService: SimulationService
  ) {
    this.subAlim = {
      days: 0,
      valuePerDay: 0
    }

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
      this.averageDaysInAMonth = foodSubsidyValue.averageDaysInAMonth;
    })
    this.marginValues$.subscribe( (marginValue: any) => {
      console.log(marginValue);
      this.margin_min = marginValue[0].nargin_min;
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

  onChangeSubAlim(event) {
    this.simFieldsData.value = this.subAlim.days * this.subAlim.valuePerDay;
  }

  saveSubAlim() {
    this.simFieldsData.name = "Subsídio alimentação";
    console.log(this.simFieldsData);
  }

}
