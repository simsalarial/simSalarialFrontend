import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AccountServiceService } from 'src/app/core/services/account-service/account-service.service';
import { Subject } from 'rxjs';
import { Account } from 'src/app/core';

@Component({
  selector: 'app-account-manag',
  templateUrl: './account-manag.component.html',
  styleUrls: ['./account-manag.component.scss']
})
export class AccountManagComponent implements OnInit {
editUserForm: any;
submitClicked = false;
state: string;
public onClose: Subject<any> = new Subject<any>();
email: string;
public account: Account = new Account();
msg: string;

  constructor(private fb: FormBuilder, private modalRef: BsModalRef, private accountApi: AccountServiceService) { }

  ngOnInit() {

    this.email = this.accountApi.getCurrentEmail();
    this.editUserForm = this.fb.group({
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    })

    this.state = 'edit';
  }

  editAccount() {
    if(this.editUserForm.newPass === this.editUserForm.confirmPass && this.editUserForm.status == 'VALID'){
      this.account.password = this.editUserForm.value.confirmPass;
      this.account.email = this.email;
      console.log(this.account);

      this.accountApi.editUserPass(this.account).subscribe(
        (account: any) => {
         console.log(account);
         this.state = 'confirm';
        },
        (error) => {
          console.error(this.msg = error.error);
        }
      );
    }
  }

  onCloseModal() { 
    if(this.state === 'edit') {
      //this.onClose.next(this.newAccount);
    }
    this.modalRef.hide();
  }

  resetForm() {
    this.editUserForm.reset();
    this.submitClicked = false;
    this.modalRef.hide();
  }
}
