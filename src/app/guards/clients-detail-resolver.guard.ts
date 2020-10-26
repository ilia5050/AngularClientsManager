import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsDetailResolverGuard implements Resolve<any> {
  
  constructor (private clientsService: ClientsService, private accountsService: AccountsService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.clientsService.getClientWithId(route.paramMap.get('id'));
  }
  

}
