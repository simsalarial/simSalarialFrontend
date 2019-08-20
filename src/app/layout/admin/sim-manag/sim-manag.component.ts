import { Component, OnInit } from '@angular/core';
import { SimulationFields } from 'src/app/core/models/simulationFields';
import { SimFieldsData } from 'src/app/core/models/simFieldsData';
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



  constructor() {
    this.subAlim = {
      days: 0,
      valuePerDay: 0
    }
  }

  ngOnInit() {

  }

  onChangeSubAlim(event) {
    this.simFieldsData.value = this.subAlim.days * this.subAlim.valuePerDay;
  }

  saveSubAlim() {
    this.simFieldsData.name = "Subsídio alimentação";
    console.log(this.simFieldsData);
  }

}
