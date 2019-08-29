import { Component, OnInit } from '@angular/core';
import { Account, AccountServiceService } from 'src/app/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewAccountComponent } from './new-account/new-account.component';

@Component({
  selector: 'app-account-manag',
  templateUrl: './account-manag.component.html',
  styleUrls: ['./account-manag.component.scss']
})
export class AccountManagComponent implements OnInit {
  state: string;
  data = [];
  modalRef: BsModalRef;
  msg: string;

  receivedData = false;
  constructor( private modalService: BsModalService, private accountService: AccountServiceService) { }

  ngOnInit() {
    this.state = 'table';
    //Table rows
    this.accountService.getAllAccounts().subscribe( (res:any) => {
      res.forEach(element => {
        let account = new Account();
        account.name = element.name;
        account.email = element.email;
        this.data.unshift(account); //Unshif for sort
      });
     // this.data = res;
      this.receivedData = true;
    })
  }

  //Send email to dlete account
  onDelete(email) {
      this.data = this.data.filter(function( obj ) {
        return obj.email !== email;
      });
  }

  //show Modal 
  showCreateAccount() {
    this.state = 'newUser';
    this.modalRef = this.modalService.show(NewAccountComponent);
    this.modalRef.content.onClose.subscribe(result => {
      //console.log('results', result);
      this.data.unshift(result);
      // create shallow copy of array, since this is a new array (and new reference) ngOnChanges hook of the ng-table.component will fire
      this.data = this.data.slice(0);
      //console.log(this.data);

    })
  }



}

