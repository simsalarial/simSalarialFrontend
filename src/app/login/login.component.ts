import { Component, OnInit } from '@angular/core';
import { Account } from '../core/models';
import { Router } from '@angular/router';
import { AccountServiceService } from '../core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public account: Account = new Account();
  public msg: string;
  loginForm: any;
  submitClicked = false;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly accountApi: AccountServiceService
  ) {
    // Fill email and password
    this.account.email = '';
    this.account.password = '';
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],//admin@admin.com
      password:  ['', Validators.required]
    })
  }

  public login() {
    this.submitClicked = true;
    Object.assign(this.account, this.loginForm.value);
    if (this.loginForm.status == 'VALID'){
      this.accountApi.login(this.account).subscribe(
        (account: any) => {
          let path = '';
          delete account.message;
          this.accountApi.currentAccount = account;
          if (account.accountRole === "ADMIN") {
            path = 'layout/admin';
          } else {
            path = 'layout/user';
          }

          const url = '/' + path;
          this.router.navigate([url]);
        },
        (error) => {
          console.error(this.msg = error.error);
        }
      );
    }
  }
}
