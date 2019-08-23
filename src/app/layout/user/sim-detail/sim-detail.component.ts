import { Component, OnInit } from '@angular/core';
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

  constructor(private accountService:AccountServiceService) {
    this.simByEmail$ = this.accountService.simByEmail$;
    this.simByEmail$.subscribe( res => {
      this.data = res;
    })
   }

  ngOnInit() {
    let email = this.accountService.getCurrentEmail();
    this.accountService.getAllSimulationsFromAccount(email);
  }

}
