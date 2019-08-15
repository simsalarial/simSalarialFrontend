import { Component, OnInit } from '@angular/core';
import { Colaborator } from 'src/app/core/models/colaborator';
import { Simulation } from 'src/app/core/models/simulation';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';
import { getLocaleFirstDayOfWeek } from '@angular/common';


@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {
  state = "first";
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


  constructor(
    private fb: FormBuilder,
    private excelService: ExcelServiceService,
  ) {
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['Filipe Braz', Validators.required],
      dependents: ['2', Validators.required],
      status: ['NÃO CASADO', Validators.required],
    })

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
      margin: [0]
    })

    this.col = new Colaborator();
    this.sim = new Simulation();
  }

  submitForm() {
    this.submitClicked = true;
    console.log(this.profileForm.value);
    Object.assign(this.col, this.profileForm.value);
    console.log(this.col);
    if (this.profileForm.status == 'VALID') {
      this.state = 'second';
      this.excelService.retrieveFromDB(this.col).subscribe((res) => {
        res;
        console.log(res);
        Object.assign(this.irsValues, res);
      });
    }
  }

  newSim() {
    console.log(this.col);
    console.log(this.sim);
  }

  getIRS(valueForIRS) {
    var index;
    for (index = 0; index < this.irsValues.length; index++) {
      if (valueForIRS <= this.irsValues[index][1]) {
        this.tempTax = parseFloat(((this.irsValues[index][2]) * 100).toFixed(2));
        break;
      }
      else {
        this.tempTax = parseFloat(((this.irsValues[this.irsValues.length - 1][2]) * 100).toFixed(2));
      }
    }
  }


  getValueForIRS() {
    var valueForIRS = this.simForm.value.baseSalary + this.simForm.value.otherBonus;
    this.getIRS(valueForIRS);
    this.calculateWorkInsuranceValue();
    this.calculateTotalAnualCost();
  }

  calculateWorkInsuranceValue() {
    this.simForm.value.workInsurance = Number((((this.rateForWorkInsurance * (this.varAccountedForWorkInsurance * this.simForm.value.baseSalary + this.monthsWithoutVacation * this.simForm.value.foodSubsidy)) / this.monthsInAYear)).toFixed(2));

  }

  calculateTotalAnualCost() {
    this.calculateWorkInsuranceValue()
    console.log(this.simForm.value.workInsurance);
    this.simForm.value.anualTotalCost = (Number(((this.simForm.value.baseSalary * this.totalPayedMonths) + (this.simForm.value.baseSalary * this.totalPayedMonths) * this.companySocialSecurity) + (this.simForm.value.foodSubsidy * this.monthsWithoutVacation) + (this.simForm.value.phone * this.monthsInAYear) + (this.simForm.value.vehicle * this.monthsInAYear) + (this.simForm.value.vehicle * this.autonomousTributation * this.monthsInAYear) + ((this.simForm.value.fuel * this.monthsInAYear) + (this.simForm.value.fuel * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.workInsurance * this.monthsInAYear) + (this.simForm.value.healthInsurance * this.monthsInAYear) + (this.simForm.value.mobileNet * this.monthsInAYear) + (this.simForm.value.zPass * this.monthsInAYear) + ((this.simForm.value.vehicleMaintenance * this.monthsInAYear) + (this.simForm.value.vehicleMaintenance * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.otherBonus * this.monthsInAYear) + ((this.simForm.value.otherWithTA * this.monthsInAYear) + (this.simForm.value.otherWithTA * this.autonomousTributation * this.monthsInAYear)) + (this.simForm.value.otherWithoutTA * this.monthsInAYear)).toFixed(2));
    console.log(this.simForm.value.anualTotalCost);
    console.log(this.simForm.value.vehicle * this.monthsInAYear)
    console.log(this.simForm.value.vehicle * this.autonomousTributation)
    console.log((this.simForm.value.vehicle * this.monthsInAYear) + (this.simForm.value.vehicle * this.autonomousTributation * this.monthsInAYear))
    console.log(this.simForm)
    this.calculateMonthlyTotalCost();
    this.calculateDailyTotalCost();
    this.calculateHourlyCost();
    this.calculateAverageGrossSalary();
    this.calculateNetSalaryWithoutDuo();



  }

  calculateMonthlyTotalCost() {
    this.simForm.value.monthlyTotalCost = Number((this.simForm.value.anualTotalCost / this.monthsInAYear).toFixed(2));
  }

  calculateDailyTotalCost() {
    this.simForm.value.dailyTotalCost = Number((this.simForm.value.anualTotalCost / this.monthsWithoutVacation / this.averageDaysInAMonth / (this.simForm.value.usagePercentage / 100)).toFixed(2));
  }

  calculateHourlyCost() {
    this.simForm.value.hourlyTotalCost = Number((this.simForm.value.dailyTotalCost / this.hoursWorkedInADay).toFixed(2));
  }

  calculateAverageGrossSalary() {
    this.simForm.value.grossSalary = Number((this.simForm.value.baseSalary + this.simForm.value.foodSubsidy + this.simForm.value.otherBonus + this.simForm.value.otherWithoutTA + this.simForm.value.otherWithTA).toFixed(2));
  }

  calculateNetSalaryWithoutDuo() {
    this.simForm.value.netSalaryWithoutDuo = Number(((this.simForm.value.baseSalary - (this.simForm.value.baseSalary * this.tempTax / 100) - (this.simForm.value.baseSalary * this.workerSocialSecurity)) + (this.simForm.value.otherBonus - (this.simForm.value.otherBonus * this.tempTax / 100)) + this.simForm.value.foodSubsidy).toFixed(2));
    this.calculateNetSalaryWithDuo();
  }

  calculateNetSalaryWithDuo() {
    this.simForm.value.netSalaryWithDuo = (this.simForm.value.netSalaryWithoutDuo + ((this.simForm.value.baseSalary * (1 - this.workerSocialSecurity - this.tempTax / 100) / this.monthsInAYear)));
  }
}
