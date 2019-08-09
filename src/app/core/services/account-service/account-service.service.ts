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
    if(this.currentAccount.userRole == "ADMIN"){
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

  public getUserRole(): string {
    return this.currentAccount.userRole;
  }

  public login(account: Account) {
    // Simulate Jax-rs Api request
    return this.http.post('', account);
    // if (account.email === 'admin' && account.password === 'admin') {
    //   account.id = 1;
    //   account.name = 'Administrador';
    //   this.currentAccount = account;
    // }

  }

  public logout() {
    this.currentAccount = null;
  }

}
