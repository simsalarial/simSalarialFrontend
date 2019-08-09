import { Component, OnInit } from '@angular/core';
import { Colaborator } from 'src/app/core/models/colaborator';
import { Simulation } from 'src/app/core/models/simulation';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.scss']
})
export class SimuladorComponent implements OnInit {
state = "first";
select = "yes";
sim: Simulation;
private col: Colaborator;

  constructor() { }

  ngOnInit() {
    this.col = new Colaborator();
    this.sim = new Simulation ();
  }

  newSim() {
    console.log(this.col);
    console.log(this.sim);
  }

  onChange() {
    
  }

}
