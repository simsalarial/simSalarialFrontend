import { Component, OnInit, ViewChild } from '@angular/core';


import { SimulationByPerson } from 'src/app/core/models/simulationByPerson';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['salesPerson', 'consultant', 'number'];



  // tslint:disable-next-line: max-line-length
  dataSource: SimulationByPerson[];                                                              // variavel com array de vazio com 3 parametros

  constructor(private simulationsList: SimulationService) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.simulationsList.getSimulationsByPerson().subscribe((data: SimulationByPerson[]) => {   // subscribe que tras do backend um array data com os 3 parametros do construtor
    // tslint:disable-next-line: max-line-length
    this.dataSource = data;                                                                       // data é guardada dentro do dataSource que era o Array vazio
    });
  }

}
