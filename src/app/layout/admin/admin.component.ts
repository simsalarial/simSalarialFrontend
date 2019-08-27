import { WorkInsurance } from './../../core/models/workInsurance';
import { FoodSubsidy } from './../../core/models/foodSubsidy';
import { DataService } from './../../core/services/data-service/data.service';
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/services';
import { Router, ActivatedRoute } from '@angular/router';
import { faUsers, faCalculator, faTasks, faTable, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Margin } from 'src/app/core/models/margin';
import { Taxation } from 'src/app/core/models/taxation';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  role: string;
  faUsers = faUsers;
  faCalculator = faCalculator;
  faTasks = faTasks;
  faTable = faTable;
  faClipboardList = faClipboardList;

  workInsuranceVariable: number;
  varAccountedForWorkInsurance: number;



  foodSubsidyMonth: number;
  averageDaysInAMonth: number;
  limitValueForFoodSubsidy: number;



  // tslint:disable-next-line: variable-name
  margin_min: number;
  // tslint:disable-next-line: variable-name
  margin_max: number;


  workerSocialSecurity: number;
  companySocialSecurity: number;
  autonomousTributation: number;

  constructor(
    private accountApi: AccountServiceService,
    private readonly router: Router,
    private simulationService: SimulationService,
    route: ActivatedRoute
  ) { 
  }

  ngOnInit() {
    this.role = this.accountApi.getAccountRole();
  }

  importDataBaseData() {
    this.simulationService.importDataBaseData();
  }

  
}
