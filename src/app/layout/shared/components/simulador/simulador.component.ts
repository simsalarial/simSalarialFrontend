import { Component, OnInit } from '@angular/core';
import { Colaborator } from 'src/app/core/models/colaborator';
import { Simulation } from 'src/app/core/models/simulation';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelServiceService } from 'src/app/core/services/excel-service.service';


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
  private irsValues: Array<object>;
  private tempTax: number;
  rateForWorkInsurance = 0.007;
  varAccountedForWorkInsurance = 14;
  totalPayedMonths = 15;
  monthsWithoutVacation = 11;
  monthsInAYear = 12;
  private tempWorkInsurance: number;


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
      baseSalary: ['', Validators.required],
      foodSubsidy: ['160.23', Validators.required],
      phone: [''],
      vehicle: [''],
      fuel: [''],
      healthInsurance: [''],
      workInsurance: ['this.tempWorkInsurance'],
      mobileNet: [''],
      zPass: [''],
      otherWithTA: [''],
      vehicleMaintenance: [''],
      otherWithoutTA: [''],
      otherBonus: ['']
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
        this.irsValues = new Array<object>();
        Object.assign(this.irsValues, res);
      });

    }
  }

  newSim() {
    console.log(this.col);
    console.log(this.sim);
  }

  getIRS(event) {
    console.log(this.irsValues);
    const tempBaseSalary = event.target.value;
    console.log(tempBaseSalary);
    var index;
    for (index = 0; index < this.irsValues.length; index++) {
      if (tempBaseSalary <= this.irsValues[index][1]) {
        console.log(this.irsValues[index][2]);
        this.tempTax = parseFloat(((this.irsValues[index][2]) * 100).toFixed(2));
        console.log(this.tempTax);
        break;
      }
      else {
        this.tempTax = parseFloat(((this.irsValues[this.irsValues.length - 1][2]) * 100).toFixed(2));
        console.log(this.tempTax);
      }
    }
    console.log(this.calculateWorkInsuranceValue(tempBaseSalary));
    this.tempWorkInsurance = this.calculateWorkInsuranceValue(tempBaseSalary);
  }

  calculateWorkInsuranceValue(tempBaseSalary) {
    return parseFloat((((this.rateForWorkInsurance * (this.varAccountedForWorkInsurance * tempBaseSalary + this.monthsWithoutVacation * 160.23)) / this.monthsInAYear)).toFixed(2));
  }
}
