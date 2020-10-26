import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountModel } from '../models/account.model';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private _addNewAccount = new Subject<any>();
  addNewAccount$ = this._addNewAccount.asObservable();

  constructor(private http: HttpClient, private appSettingsService: AppSettingsService) { }

  getAllAccounts(): any {
    return this.http.get(`${this.appSettingsService.apiUrl}/Accounts?_sort=id&_order=desc`);
  }

  getAccountsWithClientId(clientId: string): any {
    return this.http.get(`${this.appSettingsService.apiUrl}/Accounts?_sort=id&_order=desc&ClientId=${clientId}`);
  }

  updateAccountStatus(account: AccountModel): any {
    return this.http.put(`${this.appSettingsService.apiUrl}/Accounts/${account.id}`, account);
  }

  addNewAccount(account: AccountModel): any {
    return this.http.post(`${this.appSettingsService.apiUrl}/Accounts/`, account)
  }

  addNewAccountSubjNext(): void {
    this._addNewAccount.next();
  }


}
