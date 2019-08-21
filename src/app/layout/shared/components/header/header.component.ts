import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { AccountServiceService } from 'src/app/core/services/';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/core/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userRole: string;
  email: string;
  modalRef: BsModalRef;
  editUserForm: any;
  submitClicked = false;
  state: string;
  public onClose: Subject<any> = new Subject<any>();
  public account: Account = new Account();
  msg: string;
  
  constructor(
    private router: Router,
    private accountApi: AccountServiceService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) {
    this.userRole = accountApi.getAccountRole();
  }

  ngOnInit() {
    this.email = this.accountApi.getCurrentEmail();
    this.editUserForm = this.fb.group({
      newPass: ['', Validators.required],
      confirmPass: ['', Validators.required]
    })
    this.state = 'edit';
  }

  public logout() {
    this.accountApi.logout();
    this.router.navigate(['/login']);
  }

  showEditAccount(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  editAccount() {
    this.submitClicked = true;
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
