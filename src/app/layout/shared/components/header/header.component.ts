import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountServiceService } from 'src/app/core/services/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userRole: string;
  constructor(
    private router: Router,
    private accountApi: AccountServiceService
  ) {
    this.userRole = accountApi.getAccountRole();
  }

  ngOnInit() {
  }

  public logout() {
    this.accountApi.logout();
    this.router.navigate(['/login']);
  }

}
