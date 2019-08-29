import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account, AccountServiceService } from 'src/app/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})

export class NewAccountComponent implements OnInit {
newUserForm: any;
submitClicked = false;
newAccount = new Account();
public msg: string;
state: string;
public onClose: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder, private modalRef: BsModalRef, private accountService: AccountServiceService) { }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
    this.state = 'create';
  }

  createAccount() {
    this.submitClicked = true;
    if (this.newUserForm.status == 'VALID') {
      //this.data.push(this.newUserForm.value);
      Object.assign(this.newAccount, this.newUserForm.value);

     this.accountService.createAccount(this.newAccount).subscribe(
      (res: any) => {
        //console.log(res)
        this.state = 'confirm';
      },
      (error) => {
        //console.error(this.msg = error.error);
        this.state = 'error';
      })
    }
  }

  onCloseModal() { 
    if(this.state === 'confirm') {
      this.onClose.next(this.newAccount);
    }
    this.modalRef.hide();
  }

  resetForm() {
    this.newUserForm.reset();
    this.submitClicked = false;
    this.modalRef.hide();
  }
}

