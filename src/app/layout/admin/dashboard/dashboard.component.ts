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


  
  dataSource: SimulationByPerson[];                                                          // variavel de array de simulacoes vazio

  constructor(private simulationSummary: SimulationService) {
  }

  ngOnInit() {                                      
    this.simulationSummary.getSimulationsByPerson().then((data: SimulationByPerson[]) => {   // promessa que vem do servidor dentro do data
    this.dataSource = data;                                                                  //o data é armazenada dentro do dataSource que é o Array vazio
    });
  }
  
}   