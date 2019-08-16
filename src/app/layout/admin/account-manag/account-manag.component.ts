import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account, AccountServiceService } from 'src/app/core';
import { HttpClient } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewAccountComponent } from './new-account/new-account.component';
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-account-manag',
  templateUrl: './account-manag.component.html',
  styleUrls: ['./account-manag.component.scss']
})
export class AccountManagComponent implements OnInit {
  state: string;
  data = [];
  modalRef: BsModalRef;
 
  receivedData = false;
  constructor( private modalService: BsModalService, private accountService:AccountServiceService) { }

  ngOnInit() {
    console.log('entrei');
    this.state = 'table';
    this.accountService.getAllAccounts().subscribe( (res:any) => {
      console.log(res);
      res.forEach(element => {
        let account = new Account();
        account.name = element.name;
        account.email = element.email;
        this.data.push(account);
      });
     // this.data = res;
      this.receivedData = true;
    })
  }  

  onDelete(email) {
    this.accountService.deleteAccount(email).subscribe ((res:any) => {
      console.log(res);
      this.data = this.data.filter(function( obj ) {
        return obj.email !== email;
      });
    });
  }

  showCreateAccount() {
    this.state = 'newUser';
    this.modalRef = this.modalService.show(NewAccountComponent);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
      this.data.push(result);
      // create shallow copy of array, since this is a new array (and new reference) ngOnChanges hook of the ng-table.component will fire
      this.data = this.data.slice(0);
    })
  }

  
}

