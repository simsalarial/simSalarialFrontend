import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../..';

@Injectable({
  providedIn: 'root'
})
export class ColaboratorServiceService {

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: new-parens
  private account = new Account;

  saveColaboratorInDbAndGetItsID(colaborator) {
    return this.http.post('http://localhost:8080/simuladorsalarial/api/colaborators', colaborator);
  }
}
