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

  //Verify if the account is authenticated - login
  public isAuthenticated(): boolean {
    if (this.currentAccount.id) {
      return true;
    } else {
      return false;
    }
  }
  //Verify if account role is Admin
  public isAdmin(): boolean {
    return this.currentAccount.accountRole == "ADMIN";
  }

  //To know what account is signed
  public getCurrentEmail(): string {
    return this.currentAccount.email;
  }

  //Get account role (admin or owner) - for change the path after login
  public getAccountRole(): string {
    return this.currentAccount.accountRole;
  }

  //To fill the rows of account table(shared) - admin
  public getAllAccounts() {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/accounts');
  }
  //Create account - admin
  public createAccount(newAccount: Account) {
   return this.http.post('http://localhost:8080/simuladorsalarial/api/accounts', newAccount, {responseType: 'text'});
  }

  //Delete Account - admin
  public deleteAccount(email) {
    return this.http.delete('http://localhost:8080/simuladorsalarial/api/accounts/' + email, {responseType: 'text'});
  }

  //Login
  public login(account: Account): Observable<object> {
    // Simulate Jax-rs Api request
    return this.http.post('http://localhost:8080/simuladorsalarial/api/accounts/login', account);
  }

  //Edit password
  public editUserPass(account: Account) {
    return this.http.put('http://localhost:8080/simuladorsalarial/api/accounts/editAccount', account, {responseType: 'text'});
  }

  //Logout
  public logout() {
    this.currentAccount = null;
  }

  //Simulation list - user
  public getAllSimulationsFromAccount(email) {
    this.http.get('http://localhost:8080/simuladorsalarial/api/accounts/allSimsFromAccount?email=' + email).subscribe((res: any) => {
      console.log(res);
      this.simByEmail$.next(res);
    });
  }

  //Date filter
  public getAllSimulationsByDate(firstDate, secondDate, email) {
    return this.http.get('http://localhost:8080/simuladorsalarial/api/accounts/accWithFilterSimsBetweenDates?email=' + email + '&startDate=' + firstDate + '&endDate=' + secondDate);
  }
}
