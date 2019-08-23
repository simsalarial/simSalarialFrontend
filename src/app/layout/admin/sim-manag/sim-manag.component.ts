import { Extras } from './../../../core/models/extras';
import { Taxation } from './../../../core/models/taxation';
import { Margin } from './../../../core/models/margin';
import { FoodSubsidy } from './../../../core/models/foodSubsidy';
import { WorkInsurance } from 'src/app/core/models/workInsurance';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { SimulationFields } from 'src/app/core/models/simulationFields';
import { SimFieldsData } from 'src/app/core/models/simFieldsData';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';
import { ReplaySubject } from 'rxjs';
import { DataService } from 'src/app/core/services/data-service/data.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-sim-manag',
  templateUrl: './sim-manag.component.html',
  styleUrls: ['./sim-manag.component.scss']
})
export class SimManagComponent implements OnInit {
  modalRef: BsModalRef;
  simFieldsData = new SimFieldsData();
  showForm = true;
  //public fields$: ReplaySubject<SimulationFields[]>;
  subAlim;

  //Extra table
  rows = [];
  public keysTA;

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
  extras$ = new ReplaySubject<Extras[]>();
  extrasWithoutTa = new Array<any>();
  extrasWithTa = new Array<any>();


  extraName: string;
  extraWithAutonomousTributation = false;

  constructor(
    private simulationService: SimulationService,
    private modalService: BsModalService,
    private dataService: DataService
  ) {

    this.foodSubsidy$ = this.simulationService.foodSubsidy$;
    this.marginValues$ = this.simulationService.marginValues$;
    this.taxation$ = this.simulationService.taxation$;
    this.receiveWorkInsurance$ = this.simulationService.receiveworkInsurance$;
    this.extras$ = this.simulationService.extras$;
  }

  ngOnInit() {
    this.keysTA = [
      {prop: 'extra'},
      {prop: 'TA'}
    ]

    this.extras$.subscribe((newExtra: any) => {
      console.log(newExtra);

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < newExtra.length; i++) {
        if (newExtra[i].tA) {
          this.extrasWithTa.push({id: newExtra[i].id, name: newExtra[i].name, tA: 'Sim'});
        } else {
          this.extrasWithoutTa.push({id: newExtra[i].id, name: newExtra[i].name, tA: 'Não' });
        }
      }
      console.log(this.extrasWithTa, this.extrasWithoutTa);
      for (let j = 0; j < this.extrasWithTa.length; j++) {
        if (this.extrasWithTa[j].name == 'Outros C/ Tributacao Autonoma') {
          this.extrasWithTa.splice(j, 1);
        }
      }
      for (let h = 0; h < this.extrasWithoutTa.length; h++) {
        if (this.extrasWithoutTa[h].name == 'Outros S/ Tributacao Autonoma') {
          this.extrasWithoutTa.splice(h, 1);
        }
      }

      this.rows = [];
      //this.rows.push(...newExtra);
      this.rows.push(...this.extrasWithTa);
      this.rows.push(...this.extrasWithoutTa);
      // this.rows =  this.rows.slice(0);
      console.log(this.rows);
      this.extrasWithTa = new Array<any>();
      this.extrasWithoutTa = new Array<any>();

      console.log(this.extrasWithTa);
      console.log(this.extrasWithoutTa);
    });

    this.foodSubsidy$.subscribe( (foodSubsidyValue: any) => {
      console.log(foodSubsidyValue);
      this.foodSubsidyMonth = foodSubsidyValue.foodSubsidyMonth;
      this.limitValueForFoodSubsidy = foodSubsidyValue.limitValueForFoodSubsidy;
      this.averageDaysOfTheMonth = foodSubsidyValue.averageDaysOfTheMonth;
    });
    this.marginValues$.subscribe( (marginValue: any) => {
      console.log(marginValue);
      this.margin_min = marginValue[0].margin_min;
      this.margin_max = marginValue[0].margin_max;
    });
    this.taxation$.subscribe( (taxationValue: any) => {
      console.log(taxationValue);
      this.autonomousTributation = taxationValue[0].value;
      this.workerSocialSecurity = taxationValue[1].value;
      this.companySocialSecurity = taxationValue[2].value;
    });
    this.receiveWorkInsurance$.subscribe( (receiveWorkInsuranceValue: any) => {
      console.log(receiveWorkInsuranceValue);
      this.varAccountedForWorkInsurance = receiveWorkInsuranceValue.varAccountedForWorkInsurance;
      this.workInsuranceVariable = receiveWorkInsuranceValue.workInsuranceVariable;

    });
  }

  resultFoodSubsidy(event) {
    this.foodSubsidyMonth = Number((this.averageDaysOfTheMonth * this.limitValueForFoodSubsidy).toFixed(2));
  }

  newTributationValues() {
    const newTributationValues = [];
    newTributationValues.push({name: 'autonomousTributation', value: this.autonomousTributation});
    newTributationValues.push({name: 'workerSocialSecurity', value: this.workerSocialSecurity});
    newTributationValues.push({name: 'companySocialSecurity', value: this.companySocialSecurity});
    this.dataService.postNewTaxes(newTributationValues).subscribe( res => {
      console.log(res);
    });
    console.log(newTributationValues);
  }

  newMarginValues() {
    // tslint:disable-next-line: new-parens
    const newMarginValues = new Margin;
    newMarginValues.margin_min = this.margin_min;
    newMarginValues.margin_max = this.margin_max;
    console.log(newMarginValues);
    this.dataService.postNewMarginValues(newMarginValues).subscribe( res => {
      console.log(res);
    });

  }

  newFoodSubsidyValues() {
    // tslint:disable-next-line: new-parens
    const newFoodSubsidyValues = new FoodSubsidy;
    newFoodSubsidyValues.averageDaysOfTheMonth = this.averageDaysOfTheMonth;
    newFoodSubsidyValues.limitValueForFoodSubsidy = this.limitValueForFoodSubsidy;
    newFoodSubsidyValues.foodSubsidyMonth = this.foodSubsidyMonth;
    newFoodSubsidyValues.id = 1;
    console.log(newFoodSubsidyValues);
    this.dataService.putNewFoodSubsidyValue(newFoodSubsidyValues).subscribe( res => {
      console.log(res);
    });
  }

  newExtra(template) {
    // tslint:disable-next-line: new-parens
    const newExtra = new Extras;
    newExtra.name = this.extraName;
    newExtra.tA = this.extraWithAutonomousTributation;

    this.dataService.postNewExtra(newExtra).subscribe((res: any) => {
      console.log(res);
    });

    this.rows.push(newExtra);
    //this.rows =  this.rows.slice(0);
    console.log(this.rows);
    if(this.rows[this.rows.length - 1].tA) {
      this.rows[this.rows.length - 1].tA = 'Sim';
    } else {
      this.rows[this.rows.length - 1].tA = 'Não';
    }
    this.rows.sort();
    console.log(this.rows);
    console.log(this.rows.sort());



    this.extraName = '';
    this.extraWithAutonomousTributation = false;

    this.viewExtra(template);
   // this.rows.push(...this.extrasWithoutTa);

  }

  //Modal para extras

  viewExtra(template: TemplateRef<any>) {
    console.log(this.rows);


    this.modalRef = this.modalService.show(template);

  }

  onCloseModal() {
    this.modalRef.hide();
  }

  deleteExtra(extraName) {

    this.dataService.deleteExtra(extraName).subscribe((res:any) => {
      console.log(res);
      this.rows = this.rows.filter(function( obj ) {
        return obj.name !== extraName;
      });
    });

  }

  newWorkInsuranceVariables() {
    // tslint:disable-next-line: new-parens
    const newWorkInsuranceVariables = new WorkInsurance;
    newWorkInsuranceVariables.varAccountedForWorkInsurance = this.varAccountedForWorkInsurance;
    newWorkInsuranceVariables.workInsuranceVariable = this.workInsuranceVariable;
    console.log(newWorkInsuranceVariables);
    this.dataService.postNewWorkInsuranceVariables(newWorkInsuranceVariables).subscribe( res => {
      console.log(res);
    });
  }
}
