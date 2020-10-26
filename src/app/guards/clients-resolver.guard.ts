import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsResolverGuard implements Resolve<any> {
  
  constructor (private clientsService: ClientsService) {
  }

  resolve() {
    return this.clientsService.getAllClients();
  }
  
  
}
