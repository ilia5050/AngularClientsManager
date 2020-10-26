import { Component, Input, OnInit } from '@angular/core';
import { AccountCurrencyEnum } from 'src/app/models/account-currency.enum';
import { AccountModel } from 'src/app/models/account.model';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients-info-widget',
  templateUrl: './clients-info-widget.component.html',
  styleUrls: ['./clients-info-widget.component.css']
})
export class ClientsInfoWidgetComponent implements OnInit {

  @Input()
  clients: ClientModel[];

  @Input()
  accounts: AccountModel[];

  accountsAmount =  {
    'GEL': 0,
    'USD': 0,
    'EUR': 0,
    'RUB': 0  
  }

  constructor() { }

  ngOnInit(): void {

    this.generateAccountsAmount();
  }

  generateAccountsAmount(): void {
    this.accounts.forEach(a => {
      a.Balance.forEach(b => {       
        if (b.Currency === AccountCurrencyEnum.GEL) {
          this.accountsAmount['GEL'] += b.Amount;
        }
        if (b.Currency === AccountCurrencyEnum.USD) {
          this.accountsAmount['USD'] += b.Amount;
        }
        if (b.Currency === AccountCurrencyEnum.EUR) {
          this.accountsAmount['EUR'] += b.Amount;
        }
        if (b.Currency === AccountCurrencyEnum.RUB) {
          this.accountsAmount['RUB'] += b.Amount;
        }
      });
    });
  }

  
}
