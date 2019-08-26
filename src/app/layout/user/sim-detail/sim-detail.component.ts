import { Component, OnInit, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AccountServiceService } from 'src/app/core/services/account-service/account-service.service';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';

@Component({
  selector: 'app-sim-detail',
  templateUrl: './sim-detail.component.html',
  styleUrls: ['./sim-detail.component.scss']
})
export class SimDetailComponent implements OnInit {
public simByEmail$:  ReplaySubject<any> = new ReplaySubject();
data: any;
colaborator: any = {};
@Input() simulation: any;


  constructor(private accountService:AccountServiceService, private simulationService: SimulationService) {
    
    
   }

  ngOnInit() {
    console.log(this.simulation);
    this.simulationService.getSimulationById(this.simulation.simulation).subscribe( res => {
      this.simulation = res;
      console.log(res);
      
    })
  }

}
