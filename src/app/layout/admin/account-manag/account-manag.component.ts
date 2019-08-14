import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Account } from 'src/app/core';

@Component({
  selector: 'app-account-manag',
  templateUrl: './account-manag.component.html',
  styleUrls: ['./account-manag.component.scss']
})
export class AccountManagComponent implements OnInit {
  state: string;
  data = [{ name: 'Alice', email: 'aliceburigo@gmail.com'}];
  newUserForm: any;
  submitClicked = false;
  newAccount = new Account();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.state = 'table';
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }
  showCreateAccount() {
    this.state = 'newUser';
  }

  createAccount() {
    this.submitClicked = true;
    if (this.newUserForm.status == 'VALID') {
      this.data.push(this.newUserForm.value);
      this.newAccount.email = this.newUserForm.value.email;
      console.log(this.newAccount);
      this.resetForm();
    }
  }

  resetForm() {
    this.newUserForm.reset();
    this.submitClicked = false;
    this.state = 'table';
  }
  
}
