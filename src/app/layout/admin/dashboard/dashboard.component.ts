import { Component, OnInit, ViewChild } from '@angular/core';

import { SimulationService } from 'src/app/core/services/simulationService';
import { SimulationByPerson } from 'src/app/core/models/simulationByPerson';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['salesPerson', 'consultant', 'number'];

  dataSource: SimulationByPerson[];

  constructor(private simulationSummary: SimulationService) {
  }

  ngOnInit() {
    this.simulationSummary.getSimulationsByPerson().then((data: SimulationByPerson[]) => {
    this.dataSource = data;
    });
  }
  
}   