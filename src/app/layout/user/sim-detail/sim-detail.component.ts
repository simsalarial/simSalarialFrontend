import { Component, OnInit, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AccountServiceService } from 'src/app/core/services/account-service/account-service.service';

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

  constructor(private accountService:AccountServiceService) {
    
    
   }

  ngOnInit() {
    console.log(this.simulation);
    
  }

}
