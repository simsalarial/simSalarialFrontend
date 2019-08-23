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
  public simByEmail$:  ReplaySubject<any> = new ReplaySubject();

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

  public deleteAccount(email) {
    return this.http.delete('http://localhost:8080/simuladorsalarial/api/accounts/'+ email, {responseType: 'text'});
  }

  public login(account: Account): Observable<object> {
    // Simulate Jax-rs Api request
    return this.http.post('http://localhost:8080/simuladorsalarial/api/accounts/login', account);
  }

  public editUserPass(account: Account) {
    return this.http.put('http://localhost:8080/simuladorsalarial/api/accounts/editAccount', account, {responseType: 'text'});
  }

  public logout() {
    this.currentAccount = null;
  }

  public getAllSimulationsFromAccount(email) {
    this.http.get('http://localhost:8080/simuladorsalarial/api/accounts/allSimsFromAccount?email=' + email).subscribe((res: any) => {
      console.log(res);
      this.simByEmail$.next(res);
    })
  }
}
