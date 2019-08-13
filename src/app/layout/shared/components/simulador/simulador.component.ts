import { Component, OnInit } from '@angular/core';
import { Colaborator } from 'src/app/core/models/colaborator';
import { Simulation } from 'src/app/core/models/simulation';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      dependents:  ['', Validators.required],
      status:  ['', Validators.required],
    })

    this.simForm = this.fb.group({
      baseSalary: ['', Validators.required],
      foodSubsidy:  ['', Validators.required],
      phone:  ['', Validators.required],
      vehicle: ['', Validators.required],
      fuel: ['', Validators.required],
      healthInsurance: ['', Validators.required],
      workInsurance: ['', Validators.required],
      mobileNet: ['', Validators.required],
      zPass: ['', Validators.required],
      otherWithTA: ['', Validators.required],
      vehicleMaintenance: ['', Validators.required],
      otherWithoutTA: ['', Validators.required],
      otherAwards: ['', Validators.required]
    })

    this.col = new Colaborator();
    this.sim = new Simulation ();
  }

  submitForm(){
    this.submitClicked = true;
    console.log(this.profileForm.value);
    Object.assign(this.col, this.profileForm.value);
    console.log(this.col);
    if (this.profileForm.status == 'VALID'){
      this.state = 'second';
    }
  }

  newSim() {
    console.log(this.col);
    console.log(this.sim);
  }


}
