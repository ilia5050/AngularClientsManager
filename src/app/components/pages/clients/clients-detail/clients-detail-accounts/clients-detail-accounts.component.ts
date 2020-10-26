import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate, keyframes,
  AnimationEvent
} from '@angular/animations';
import { AccountCurrencyEnum } from 'src/app/models/account-currency.enum';
import { AccountStatusEnum } from 'src/app/models/account-status.enum';
import { AccountTypeEnum } from 'src/app/models/account-type.enum';
import { AccountModel } from 'src/app/models/account.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-clients-detail-accounts',
  templateUrl: './clients-detail-accounts.component.html',
  styleUrls: ['./clients-detail-accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsDetailAccountsComponent implements OnInit {

  @Input()
  client: AccountModel;

  @Input()
  accounts: AccountModel[];

  closeSelectedAccount: AccountModel;

  private subscribers: any = {};

  constructor(private modalService: NgbModal, private accountsService: AccountsService, private cd: ChangeDetectorRef) { }
  
  ngOnInit(): void {

    this.subscribers.addNewAccount = this.accountsService.addNewAccount$.subscribe(() => {
      this.addNewAccountFromSubsciber();
      this.cd.detectChanges();
    });

  }

  ngOnDestroy() {
    this.unsubscribeSubscribers();    
  }

  unsubscribeSubscribers(): void {
    for (const key in this.subscribers) {
      if (this.subscribers[key]) {
        this.subscribers[key].unsubscribe();
      }
    }
  }

  getAccountTypeWithTypeId(accountTypeId: number): string {
    let name = '';
    switch(accountTypeId) {
      case AccountTypeEnum.Accumulative:
        name = 'დაგროვებითი';
        break;
      case AccountTypeEnum.Current:
        name = 'მიმდინარე';
        break;
      case AccountTypeEnum.Saving:
        name = 'შემნახველი';
        break;
    }
    return name;
  }

  getAccountStausNameWithStatus(accountStatusId: number): string {
    let name = '';
    switch(accountStatusId) {
      case AccountStatusEnum.Active:
        name = 'აქტიური';
        break;
      case AccountStatusEnum.Closed:
        name = 'დახურული';
        break;
    }
    return name;
  }

  getAccountCurrencySymbol(accountCurrency: number): string {
    let symbol = '';
    switch(accountCurrency) {
      case AccountCurrencyEnum.USD:
        symbol = '$';
        break;
      case AccountCurrencyEnum.GEL:
        symbol = '₾';
        break;
      case AccountCurrencyEnum.EUR:
        symbol = '€';
        break;
      case AccountCurrencyEnum.RUB:
        symbol = '₽';
        break;
    }
    return symbol;
  }

  openCloseAccountModal(accountId: number, content: any): void {

    this.closeSelectedAccount = this.accounts.find(a => a.id === accountId);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
      this.closeSelectedAccount = null;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.closeSelectedAccount = null;
    });
  }

  openCloseAccountRequest(): void {
    this.modalService.dismissAll();
    this.closeSelectedAccount.Status = (this.closeSelectedAccount.Status === AccountStatusEnum.Active) ? AccountStatusEnum.Closed : AccountStatusEnum.Active;
    this.accountsService.updateAccountStatus(this.closeSelectedAccount).subscribe(() => {
    }, error => {
      console.log('Error', error);
    });
  }

  addAccountModalOpen(content: any): void {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeSelectedAccount = null;
    }, (reason) => {
      // this.closeSelectedAccount = null;
    });
  }

  addNewAccountFromSubsciber(): void {
    this.accountsService.getAccountsWithClientId(String(this.client.id)).subscribe((accounts) => {
      this.accounts = accounts;
      this.cd.detectChanges();
    });
  }

  parentFun() {
    alert('parent component function.');
  }


  
}
