import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsDetailAccountsResolverGuard implements Resolve<any> {
  
  constructor (private clientsService: ClientsService, private accountsService: AccountsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.accountsService.getAccountsWithClientId(route.paramMap.get('id'));
  }
  

}
