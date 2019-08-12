import { Injectable } from '@angular/core';
import { Account } from '../../models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private currentAccount: Account = new Account();

  constructor(
    private http: HttpClient
  ) { }

  public isAuthenticated(): boolean {
    if (this.currentAccount.id) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    if(this.currentAccount.accountRole == "ADMIN"){
      return true;
    } else {
      return false;
    }
  }

  public getCurrentId(): number {
    return this.currentAccount.id;
  }

  public getCurrentEmail(): string {
    return this.currentAccount.email;
  }

  public getAccountRole(): string {
    return this.currentAccount.accountRole;
  }

  public login(account: Account) {
    // Simulate Jax-rs Api request
    return this.http.post('http://localhost:8080/simuladorsalarial/api/accounts/login', account);
  }

  public logout() {
    this.currentAccount = null;
  }

}
