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
  select = "yes";
  sim: Simulation;
  profileForm: any;
  private col: Colaborator;
  submitClicked = false;

  constructor(
    private fb: FormBuilder,
    private excelService: ExcelServiceService
    ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      dependents: ['', Validators.required],
      status: ['', Validators.required],
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
        console.log(res);
    });
    }
  }

  newSim() {
    console.log(this.col);
    console.log(this.sim);
  }

  onChange() {

  }

}
