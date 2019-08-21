import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/core/services/account-service/account-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountManagComponent } from '../user/account-manag/account-manag.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
state: string;
modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private accountService:AccountServiceService, private readonly accountApi: AccountServiceService) { }

  ngOnInit() {
    this.state = 'simulator';
  }

  showEditAccount() {
    this.modalRef = this.modalService.show(AccountManagComponent);

  }

}
