import { Component, OnInit, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AccountServiceService } from 'src/app/core/services/account-service/account-service.service';
import { SimulationService } from 'src/app/core/services/simulation-data/simulation.service';
import { Extras } from 'src/app/core/models/extras';
import { DataService } from 'src/app/core/services/data-service/data.service';
import { SimFieldsData } from 'src/app/core/models/simFieldsData';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sim-detail',
  templateUrl: './sim-detail.component.html',
  styleUrls: ['./sim-detail.component.scss']
})
export class SimDetailComponent implements OnInit {
public simByEmail$:  ReplaySubject<any> = new ReplaySubject();
data: any;
colaborator: any = {};
extras$: any = [];
@Input() simulation: any;
extrasName: any =[];
faInfoCircle = faInfoCircle;

  constructor(private accountService:AccountServiceService, private simulationService: SimulationService, private dataService: DataService) {
    this.dataService.getAllExtras().subscribe((extras: any) => {

      extras.forEach(element => {
        
        let simKeys = Object.keys(this.simulation);

        simKeys.forEach( keys => {
          if (keys === element.name){
            let extra = new SimFieldsData();
            extra.name = element.name;
            extra.value = this.simulation[element.name];
            this.extras$.push(extra);
          }
        })
      });      
    });
   }

  ngOnInit() {
  }

}
