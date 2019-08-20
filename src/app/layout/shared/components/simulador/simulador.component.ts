import { Component, OnInit } from '@angular/core';
import { Colaborator } from 'src/app/core/models/colaborator';
import { Simulation } from 'src/app/core/models/simulation';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import * as jsPDF from 'jspdf';
import { ExcelServiceService } from 'src/app/core/services/excel-service/excel-service.service';
import { DataService } from 'src/app/core/services/data-service/data.service';
import { Taxation } from 'src/app/core/models/taxation';
import { Extras } from 'src/app/core/models/extras';
import { SimFieldsData } from 'src/app/core/models/simFieldsData';
import { splitClasses } from '@angular/compiler';
import { SliderComponent } from '../slider/slider.component';


@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {
  state = 'first';
  sim: Simulation;
  profileForm: any;
  simForm: any;
  private col: Colaborator;
  taxation: Taxation;
  taxationForm: any;
  submitClicked = false;
  valPhone: number;
  valVehicle: number;
  private simExtraElements = new Array<Extras>();
  extrasWithTa = new Array<SimFieldsData>();
  extrasWithoutTa = new Array<SimFieldsData>();
  private irsValues = new Array<object>();
  private tempTax: number;
  rateForWorkInsurance = 0.007;
  varAccountedForWorkInsurance = 14;
  totalPayedMonths = 15;
  monthsWithoutVacation = 11;
  monthsInAYear = 12;
  averageDaysInAMonth = 21;
  selectExtra = "";
  // Tributações //
  private workerSocialSecurity: number;
  private companySocialSecurity: number;
  private autonomousTributation: number;

  SimFieldsData: SimFieldsData;
  hoursWorkedInADay = 8;
  marginPercentage;
  markUp;
  usagePercentage = 100;
  extras: FormArray;
  extrasArray: any;
  extrasSelectedWithout = new Array<SimFieldsData>();
  extrasSelectedWith = new Array<SimFieldsData>();

  constructor(
    private fb: FormBuilder,
    private excelService: ExcelServiceService,
    private dataService: DataService,
    // private slider: SliderComponent,
  ) {
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['Sr. Ricas', Validators.required],
      dependents: ['2', Validators.required],
      status: ['Não Casado', Validators.required],
    })
    console.log(this.profileForm);
    this.usagePercentage = 100;
    this.simForm = this.fb.group({
      baseSalary: [Number, Validators.required],
      foodSubsidy: [160.23, Validators.required],
      phone: [0],
      vehicle: [0],
      fuel: [0],
      healthInsurance: [0],
      workInsurance: [0],
      mobileNet: [0],
      zPass: [0],
      otherWithTA: [0],
      vehicleMaintenance: [0],
      otherWithoutTA: [0],
      otherBonus: [0],
      anualTotalCost: [0],
      netSalaryWithoutDuo: [0],
      netSalaryWithDuo: [0],
      grossSalary: [0],
      usagePercentage: [100],
      monthlyTotalCost: [0],
      dailyTotalCost: [0],
      hourlyTotalCost: [0],
      anualRate: [0],
      monthlyRate: [0],
      dailyRate: [0],
      hourlyRate: [0],
      extrasWithTa:  new FormArray([]),
      extrasWithoutTa: new FormArray([])
    });
    this.simForm.reset();
    // this.simForm.value.extras = [];
    this.usagePercentage = 100;
    console.log(this.simForm.value);
    this.col = new Colaborator();
    this.sim = new Simulation();
    this.taxation = new Taxation();
    this.addAllExtras();

  }

  addAllExtras() {
    this.simForm.addControl('extrasWithTa', this.fb.group({
      // name: [''],
      // value: [0]
    }));

    this.simForm.addControl('extrasWithoutTa', this.fb.group({
      name: [''],
      value: [0]
    }));

    console.log(this.simForm.value.extrasWithTa.value);
  }

  addExtras() {//faz pedido a api
    this.extrasWithTa.forEach(extras => {
      this.extras = this.simForm.get('extras') as FormArray;
      this.extras.push(this.createExtras());
    });
    console.log(this.extras);
    console.log(this.extrasWithTa);
    console.log(this.simForm.value);
  }

    // convenience getters for easy access to form fields
    get f() { return this.simForm.controls; }
    get t() { return this.f.extrasWithTa as FormArray; }
    get g() { return this.f.extrasWithoutTa as FormArray; }

  createExtras(): FormGroup {
    return this.fb.group({
      name: '',
      value: [0],
    });
  }

  teste(event) {
   
    console.log(event.target.value);
    console.log(this.extrasArray);
    var index;
    for (index = 0; index < this.extrasArray.length; index++) {
      console.log(this.extrasArray[index]);
      if(this.extrasArray[index].name == event.target.value){
        console.log(this.extrasArray[index].tA);
        if(this.extrasArray[index].tA) {
          this.t.push(this.fb.group({
            name: [ this.extrasArray[index].name],
            value: ['']
          }));
          console.log(this.t.controls);
        }
        else {
          this.g.push(this.fb.group({
            name: [ this.extrasArray[index].name],
            value: ['']
          }));
          console.log(this.g.controls);
        }
        this.extrasArray.splice(index, 1);
      }
    }
    console.log('with',this.extrasSelectedWith);
    console.log('without',this.extrasSelectedWithout);
  }

  submitForm() {
    this.submitClicked = true;
    console.log(this.profileForm.value);
    Object.assign(this.col, this.profileForm.value);
    console.log(this.col);
    if (this.profileForm.status == 'VALID') {
      this.state = 'second';
      this.excelService.retrieveFromDB(this.col).subscribe((res) => {
        // tslint:disable-next-line: no-unused-expression
        //  res;
        console.log(res);
        Object.assign(this.irsValues, res);
      });
      // Get overall taxes //
      this.dataService.retrieveDataServiceTaxes(this.taxation).subscribe((taxRes) => {
        // tslint:disable-next-line: no-unused-expression
        //taxRes;
        Object.assign(this.taxation, taxRes);
        console.log(this.taxation);
        this.parseTaxationToIndividualValue(this.taxation);
      });
      // Get elements for simulation and the way they're taxed //
      this.dataService.retrieveDataServiceExtras(this.extras).subscribe((extraRes) => {
        // tslint:disable-next-line: no-unused-expression
        //extraRes;
        console.log(extraRes);

        Object.assign(this.simExtraElements, extraRes);
        this.resolveSimExtraElements();

      });
    }
  }
  resolveSimExtraElements() {
    console.log(this.simExtraElements);
    console.log(this.simExtraElements[0].name);


    for (let i = 0; i < this.simExtraElements.length; i++) {
      this.SimFieldsData = new SimFieldsData();
      this.SimFieldsData.name = this.simExtraElements[i].name;
      this.SimFieldsData.value = 0;
      this.SimFieldsData.tA = (this.simExtraElements[i].tA);
      if (this.simExtraElements[i].tA) {
        this.extrasWithTa.push(  this.SimFieldsData );
      } else {
        this.extrasWithoutTa.push(  this.SimFieldsData );
      }
    }
   /*  this.simForm.value.extrasWithTa = this.extrasWithTa;
    this.simForm.value.extrasWithoutTa = this.extrasWithoutTa;*/
    this.extrasArray = this.extrasWithTa.concat(this.extrasWithoutTa); 
    console.log(this.extrasArray);
  }

  parseTaxationToIndividualValue(taxation: Taxation) {
    this.autonomousTributation = taxation[0].value / 100;
    this.workerSocialSecurity = taxation[1].value / 100;
    this.companySocialSecurity = taxation[2].value / 100;

  }

  reset() {
    this.simForm.reset();
    this.simForm.value.foodSubsidy = 160.23;
    this.simForm.value.usagePercentage = this.usagePercentage;
    this.tempTax = 0;
    this.marginPercentage = 0;
    this.markUp = 0;
    for (let i = 0; i < this.simForm.value.extrasWithTa.length; i++) {
      this.simForm.value.extrasWithTa.name[i].value = 0;
    }
    for (let j = 0; j < this.simForm.value.extrasWithoutTa.length; j++) {
      this.simForm.value.extrasWithoutTa.name[j].value = 0;
    }
  }
  goBack() {

    this.simForm.reset();
    this.simForm.value.foodSubsidy = 160.23;
    this.simForm.value.baseSalary = 0;
    this.simForm.value.usagePercentage = this.usagePercentage;
    this.tempTax = 0;
    this.marginPercentage = 0;
    this.markUp = 0;
    this.state = 'first';
    this.simForm.value.extrasWithTa.reset();
    this.simForm.value.extrasWithoutTa.reset();
  }

  newSim() {
    console.log(this.col);
    console.log(this.sim);
  }

  getIRS(valueForIRS: number) {
    let index: number;
    for (index = 0; index < this.irsValues.length; index++) {
      if (valueForIRS <= this.irsValues[index][1]) {
        this.tempTax = parseFloat(((this.irsValues[index][2]) * 100).toFixed(2));
        break;
      } else {
        this.tempTax = parseFloat(((this.irsValues[this.irsValues.length - 1][2]) * 100).toFixed(2));
      }
    }
  }


  getValueForIRS() {
    const valueForIRS = this.simForm.value.baseSalary + this.simForm.value.otherBonus;
    this.getIRS(valueForIRS);
    this.calculateWorkInsuranceValue();
    this.calculateTotalAnualCost();
  }

  calculateWorkInsuranceValue() {
    // tslint:disable-next-line: max-line-length
    this.simForm.value.workInsurance = Number((((this.rateForWorkInsurance * (this.varAccountedForWorkInsurance * this.simForm.value.baseSalary + this.monthsWithoutVacation * this.simForm.value.foodSubsidy)) / this.monthsInAYear)).toFixed(2));
  }

  calculateTotalAnualCost() {
    var array = Object.keys(this.simForm.value);
    array.filter(key => this.simForm.value[key]).forEach(key => {
      console.log(key, this.simForm.value[key]);
    });
    this.calculateWorkInsuranceValue();
    console.log(this.simForm.value);
    // tslint:disable-next-line: max-line-length
    // this.simForm.value.anualTotalCost = Number((((this.simForm.value.baseSalary * this.totalPayedMonths) + (this.simForm.value.baseSalary * this.totalPayedMonths) * this.companySocialSecurity) + (this.simForm.value.foodSubsidy * this.monthsWithoutVacation) + (this.simForm.value.workInsurance * this.monthsInAYear) + (this.simForm.value.healthInsurance * this.monthsInAYear) + (this.simForm.value.otherBonus * this.monthsInAYear) + (this.simForm.value.phone * this.monthsInAYear) + (this.simForm.value.vehicle * this.monthsInAYear) + (this.simForm.value.vehicle * this.autonomousTributation * this.monthsInAYear) + ((this.simForm.value.fuel * this.monthsInAYear) + (this.simForm.value.fuel * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.mobileNet * this.monthsInAYear) + (this.simForm.value.zPass * this.monthsInAYear) + ((this.simForm.value.vehicleMaintenance * this.monthsInAYear) + (this.simForm.value.vehicleMaintenance * this.autonomousTributation * this.monthsInAYear))  + ((this.simForm.value.otherWithTA * this.monthsInAYear) + (this.simForm.value.otherWithTA * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.otherWithoutTA * this.monthsInAYear)).toFixed(2));

    // tslint:disable-next-line: max-line-length
    this.simForm.value.anualTotalCost = (((this.simForm.value.baseSalary * this.totalPayedMonths) + (this.simForm.value.baseSalary * this.totalPayedMonths) * this.companySocialSecurity) + (this.simForm.value.foodSubsidy * this.monthsWithoutVacation) + (this.simForm.value.workInsurance * this.monthsInAYear) + (this.simForm.value.healthInsurance * this.monthsInAYear) + (this.simForm.value.otherBonus * this.monthsInAYear));

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.simForm.value.extrasWithTa.name.length; i++) {
      // tslint:disable-next-line: max-line-length
      this.simForm.value.anualTotalCost += (this.simForm.value.extrasWithTa[i].name.value * this.monthsInAYear) + (this.simForm.value.extrasWithTa[i].name.value * this.autonomousTributation * this.monthsInAYear);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < this.simForm.value.extrasWithoutTa.name.length; j++) {
      // tslint:disable-next-line: max-line-length
      this.simForm.value.anualTotalCost += (this.simForm.value.extrasWithoutTa[j].name.value * this.monthsInAYear) + (this.simForm.value.extrasWithoutTa[j].name.value * this.autonomousTributation * this.monthsInAYear);
    }


    console.log(this.simForm.value.anualTotalCost);
    this.calculateMonthlyTotalCost();
    this.calculateAverageGrossSalary();
    this.calculateNetSalaryWithoutDuo();
    // this.calculateRate ();
  }

  calculateMonthlyTotalCost() {
    this.simForm.value.monthlyTotalCost = Number((this.simForm.value.anualTotalCost / this.monthsInAYear).toFixed(2));
    this.calculateDailyTotalCost();
  }

  calculateDailyTotalCost() {
    // tslint:disable-next-line: max-line-length
    this.simForm.value.dailyTotalCost = Number((this.simForm.value.anualTotalCost / this.monthsWithoutVacation / this.averageDaysInAMonth / (this.simForm.value.usagePercentage / 100)).toFixed(2));
    console.log(this.simForm.value.dailyTotalCost);
    this.calculateHourlyCost();
  }

  calculateHourlyCost() {
    this.simForm.value.hourlyTotalCost = Number((this.simForm.value.dailyTotalCost / this.hoursWorkedInADay).toFixed(2));
  }

  calculateAverageGrossSalary() {
    // tslint:disable-next-line: max-line-length
    this.simForm.value.grossSalary = Number((this.simForm.value.baseSalary + this.simForm.value.foodSubsidy + this.simForm.value.otherBonus + this.simForm.value.otherWithoutTA + this.simForm.value.otherWithTA).toFixed(2));
  }

  calculateNetSalaryWithoutDuo() {
    // tslint:disable-next-line: max-line-length
    this.simForm.value.netSalaryWithoutDuo = Number(((this.simForm.value.baseSalary - (this.simForm.value.baseSalary * this.tempTax / 100) - (this.simForm.value.baseSalary * this.workerSocialSecurity)) + (this.simForm.value.otherBonus - (this.simForm.value.otherBonus * this.tempTax / 100)) + this.simForm.value.foodSubsidy).toFixed(2));
    this.calculateNetSalaryWithDuo();
  }

  calculateNetSalaryWithDuo() {
    // tslint:disable-next-line: max-line-length
    this.simForm.value.netSalaryWithDuo = Number((this.simForm.value.netSalaryWithoutDuo + ((this.simForm.value.baseSalary * (1 - this.workerSocialSecurity - this.tempTax / 100) / this.monthsInAYear))).toFixed(2));
  }

  calculateMarkUp() {

    console.log(this.markUp);
    setTimeout(function () {
      console.log(this.marginPercentage);
      this.markUp = Number((this.simForm.value.anualTotalCost * (this.marginPercentage / 100)).toFixed(2));

    }.bind(this), 500);
    this.calculateRate();
  }

  calculateRate() {
    this.simForm.value.anualRate = Number((this.simForm.value.anualTotalCost + this.markUp).toFixed(2));
    this.calculateMonthlyRate();
  }
  calculateMonthlyRate() {
    if (this.markUp < 0) {
      // tslint:disable-next-line: max-line-length
      this.simForm.value.monthlyRate = Number((this.simForm.value.anualRate / this.monthsWithoutVacation / (this.simForm.value.usagePercentage / 100)).toFixed(2));
    } else {
      // tslint:disable-next-line: max-line-length
      this.simForm.value.monthlyRate = Number((this.simForm.value.anualTotalCost / this.monthsWithoutVacation / (this.simForm.value.usagePercentage / 100)).toFixed(2));
    }

    this.calculateDailyRate();
  }
  calculateDailyRate() {
    this.simForm.value.dailyRate = Number((this.simForm.value.monthlyRate / this.averageDaysInAMonth).toFixed(2));
    this.calculateHourlyRate();
  }
  calculateHourlyRate() {
    this.simForm.value.hourlyRate = Number((this.simForm.value.dailyRate / this.hoursWorkedInADay).toFixed(2));
  }

  exportToPDF() {
    // let doc = new jsPDF();
    // // tslint:disable-next-line: only-arrow-functions
    // doc.addHTML(document.getElementById('teste'), function() {
    //    doc.save('teste.pdf');
    // });


    // window.print();

    // var doc =  new jsPDF();
    // doc.setFontSize(22);
    // doc.text(20,20, 'Este é o PDF');
    // // doc.setFontSize()
    // // doc.text(this.simForm.value);
    // doc.setFontSize(16);
    // doc.text(20,30, 'Isto é texto no fim');
    // doc.setTextColor(0,0,255);
    // doc.text(20,30, 'Isto é azul');

    // var pdf = new jsPDF('p','pt','a4');
    // pdf.addHTML(document.body,function(){
    //   var string = pdf.output('datauristring')
    //   $('.testes').attr('src', string);
    // })
    var x = Object.values(this.simForm.value);
    var doc = new jsPDF();
    doc.text('Salario Base: ', 10, 10);
    doc.text(this.profileForm.name, 10, 10);
    doc.save('a4.pdf');


  }
}
