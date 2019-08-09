import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  role: string;
  constructor(
    private accountApi: AccountServiceService
  ) { }

  ngOnInit() {
    this.role = this.accountApi.getUserRole();
  }

}
