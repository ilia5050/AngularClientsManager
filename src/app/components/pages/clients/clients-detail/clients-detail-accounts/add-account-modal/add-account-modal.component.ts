import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountCurrencyEnum } from 'src/app/models/account-currency.enum';
import { AccountStatusEnum } from 'src/app/models/account-status.enum';
import { AccountTypeEnum } from 'src/app/models/account-type.enum';
import { AccountModel } from 'src/app/models/account.model';
import { ClientModel } from 'src/app/models/client.model';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAccountModalComponent implements OnInit {

  @Input()
  modal: any;

  @Input()
  client: ClientModel;

  @Output("parentFun") 
  parentFun: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  accountTypes = [    
    { Name: 'მიმდინარე', Id: AccountTypeEnum.Current },
    { Name: 'დაგროვებითი', Id: AccountTypeEnum.Accumulative },
    { Name: 'შემნახველი', Id: AccountTypeEnum.Saving },
  ];

  accountCurrencies = [    
    { Name: 'GEL', Id: AccountCurrencyEnum.GEL },
    { Name: 'USD', Id: AccountCurrencyEnum.USD },
    { Name: 'EUR', Id: AccountCurrencyEnum.EUR },
    { Name: 'RUB', Id: AccountCurrencyEnum.RUB },
  ];
  
  constructor(private readonly fb: FormBuilder, private modalService: NgbModal, private accountsService: AccountsService, private cd: ChangeDetectorRef) { 
    this.form = this.fb.group({
      type: [null, [Validators.required]],      
      currency: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  addAccountRequest(): void {

    if (this.form.valid) {

      this.modalService.dismissAll();
      
      const newAccount = this.generateNewAccountByFormGroup();

      this.accountsService.addNewAccount(newAccount).subscribe(() => {
        this.parentFun.emit();
        this.accountsService.addNewAccountSubjNext();
        this.cd.detectChanges();
      }, err => {
        console.log(err)
      });
    } else {
      alert('გთხოვთ გადაამოწმოთ შეყვანილი მონაცემები');
    }
  }

  generateNewAccountByFormGroup(): AccountModel {
    const account = new AccountModel();
    account.ClientId = this.client.id;
    account.Type = this.form.get('type').value;
    account.Balance = [];
    this.form.get('currency').value.forEach(c => {
      account.Balance.push({ Currency: c, Amount: 0 });
    });
    account.Status = AccountStatusEnum.Closed;
    return account;
  }


}
