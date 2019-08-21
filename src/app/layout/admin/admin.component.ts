import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { faUsers, faCalculator, faTasks, faTable } from '@fortawesome/free-solid-svg-icons';

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

  constructor(
    private accountApi: AccountServiceService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.role = this.accountApi.getAccountRole();
  }

  redirect() {
    this.router.navigateByUrl("/layout/admin/simulador");
  }

}
