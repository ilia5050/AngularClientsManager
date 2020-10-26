import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { AccountsService } from '../services/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsResolverGuard implements Resolve<any> {

  constructor (private accountsService: AccountsService) {
  }

  resolve() {
    return this.accountsService.getAllAccounts();
  }
  

}
