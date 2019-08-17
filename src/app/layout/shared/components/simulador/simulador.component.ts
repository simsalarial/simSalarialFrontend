import { Component, OnInit } from '@angular/core';
import { Colaborator } from 'src/app/core/models/colaborator';
import { Simulation } from 'src/app/core/models/simulation';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import * as jsPDF from 'jspdf';
import { ExcelServiceService } from 'src/app/core/services/excel-service/excel-service.service';


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
  submitClicked = false;
  valPhone: number;
  valVehicle: number;
  private irsValues = new Array<object>();
  private tempTax: number;
  rateForWorkInsurance = 0.007;
  varAccountedForWorkInsurance = 14;
  totalPayedMonths = 15;
  monthsWithoutVacation = 11;
  monthsInAYear = 12;
  averageDaysInAMonth = 21;
  private workerSocialSecurity = 0.11;
  private companySocialSecurity = 0.2375;
  private autonomousTributation = 0.1;
  hoursWorkedInADay = 8;
  marginPercentage;
  markUp;
  usagePercentage = 100;
  extras: FormArray;
  extrasArray: any;

  constructor(
    private fb: FormBuilder,
    private excelService: ExcelServiceService,
  ) {
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      dependents: ['', Validators.required],
      status: ['', Validators.required],
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
      extras: this.fb.array( [] ),
    });
    this.simForm.reset();
    this.simForm.value.extras = ['1'];
    this.usagePercentage = 100;
    console.log(this.simForm.value);
    this.col = new Colaborator();
    this.sim = new Simulation();
  }

  addExtras() {//faz pedido a api
    this.extrasArray.forEach(extra => {
      this.extras = this.simForm.get('extras') as FormArray;
      this.extras.push(this.createExtras());
    });
  }

  createExtras(): FormGroup {
    return this.fb.group({
      name: '',
      description: '',
      price: ''
    });
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
        res;
        console.log(res);
        Object.assign(this.irsValues, res);
      });
    }
  }

  reset() {
    this.simForm.reset();
    this.simForm.value.foodSubsidy = 160.23;
    this.simForm.value.usagePercentage = this.usagePercentage;
    this.tempTax = 0;
    this.marginPercentage = 0;
    this.markUp = 0;
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
    var array= Object.keys(this.simForm.value);
    array.filter(key => this.simForm.value[key]).forEach( key => {
      console.log(key, this.simForm.value[key] );
    })
    this.calculateWorkInsuranceValue();
    console.log(this.simForm.value);
    // tslint:disable-next-line: max-line-length
    this.simForm.value.anualTotalCost = Number((((this.simForm.value.baseSalary * this.totalPayedMonths) + (this.simForm.value.baseSalary * this.totalPayedMonths) * this.companySocialSecurity) + (this.simForm.value.foodSubsidy * this.monthsWithoutVacation) + (this.simForm.value.phone * this.monthsInAYear) + (this.simForm.value.vehicle * this.monthsInAYear) + (this.simForm.value.vehicle * this.autonomousTributation * this.monthsInAYear) + ((this.simForm.value.fuel * this.monthsInAYear) + (this.simForm.value.fuel * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.workInsurance * this.monthsInAYear) + (this.simForm.value.healthInsurance * this.monthsInAYear) + (this.simForm.value.mobileNet * this.monthsInAYear) + (this.simForm.value.zPass * this.monthsInAYear) + ((this.simForm.value.vehicleMaintenance * this.monthsInAYear) + (this.simForm.value.vehicleMaintenance * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.otherBonus * this.monthsInAYear) + ((this.simForm.value.otherWithTA * this.monthsInAYear) + (this.simForm.value.otherWithTA * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.otherWithoutTA * this.monthsInAYear)).toFixed(2));

    console.log(this.simForm);
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
    setTimeout(function() {
      console.log(this.marginPercentage);
      this.markUp = Number((this.simForm.value.anualTotalCost * (this.marginPercentage / 100)).toFixed(2));

    }.bind(this), 500);
    this.calculateRate();
  }

  calculateRate() {
    this.simForm.value.anualRate = Number((this.simForm.value.anualTotalCost + this.markUp).toFixed(2));
    this.calculateMonthlyRate ();
  }
  calculateMonthlyRate() {
    // tslint:disable-next-line: max-line-length
    this.simForm.value.monthlyRate = Number((this.simForm.value.anualTotalCost / this.monthsWithoutVacation / (this.simForm.value.usagePercentage / 100)).toFixed(2));
    this.calculateDailyRate ();
  }
  calculateDailyRate() {
    this.simForm.value.dailyRate = Number((this.simForm.value.monthlyRate / this.averageDaysInAMonth).toFixed(2));
    this.calculateHourlyRate ();
  }
  calculateHourlyRate() {
    this.simForm.value.hourlyRate = Number((this.simForm.value.dailyRate / this.hoursWorkedInADay).toFixed(2));
  }

  
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
    //var x = Object.values(this.simForm.value);
    //var doc = new jsPDF();
    //doc.text('Salario Base: ',10,10);
    //doc.text(this.profileForm.name,10,10);
    //doc.save('a4.pdf');


    exportToPDF() {
    let imgData = 'data:image/png;base64,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';

    let doc = new jsPDF();
    let consultant = 'Jose';
    let salesPerson = 'Rita';

    ///// header /////
    doc.addImage(imgData, 'JPEG', 15, 10, 30, 30);
    doc.setFontSize(20);
    doc.text(65, 30, "Simulation of consultant " + consultant);

    ///// body /////


    ///// footer /////
    doc.setFontSize(13);
    doc.text(150, 270, "Simulation by " + salesPerson);

    doc.save('test.pdf');
    
    }
  
}
