import { Injectable } from '@angular/core';
import { Account } from '../../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  public currentAccount: Account = new Account();
  public accounts$: ReplaySubject<Account[]>;
  constructor(private http: HttpClient) {
   
  }

  public isAuthenticated(): boolean {
    if (this.currentAccount.id) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    return this.currentAccount.accountRole == "ADMIN";
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

  public getAllAccounts() {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/accounts');
  }

  public createAccount(newAccount: Account) {
   return this.http.post('http://localhost:8080/simuladorsalarial/api/accounts', newAccount, {responseType: 'text'});
  }

  public login(account: Account): Observable<Object> {
    // Simulate Jax-rs Api request
    return this.http.post('http://localhost:8080/simuladorsalarial/api/accounts/login', account);
  }

  public logout() {
    this.currentAccount = null;
  }
}
