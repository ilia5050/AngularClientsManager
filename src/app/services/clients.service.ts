import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientDeleteStatusEnum, ClientModel } from '../models/client.model';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private _showResultAfterFilter = new Subject<any>();
  showResultAfterFilter$ = this._showResultAfterFilter.asObservable();

  constructor(private http: HttpClient, private appSettingsService: AppSettingsService) { }

  getAllClients(): any {
    return this.http.get(`${this.appSettingsService.apiUrl}/clients?Deleted=0&_sort=id&_order=desc`);
  }

  getClientWithId(id: string): any {
    return this.http.get(`${this.appSettingsService.apiUrl}/clients?Deleted=0&id=${id}`);
  }

  getClients(page: number, sortById: boolean, limit: number, searchData: string): any {
    return this.http.get(`${this.appSettingsService.apiUrl}/clients?Deleted=0&_sort=id&_order=${(sortById)?'asc':'desc'}&_page=${page}&_limit=${limit}${searchData}`);
  }

  searchClient(searchData: string): any {
    return this.http.get(`${this.appSettingsService.apiUrl}/clients?Deleted=0&_sort=id&_order=desc${searchData}`);
  }

  showResultAfterFilter(data: { SearchData: string, Results: ClientModel[] }): void {
    this._showResultAfterFilter.next(data);    
  }

  deleteClient(client: ClientModel): any {   
    client.Deleted = ClientDeleteStatusEnum.Deleted; 
    return this.http.put(`${this.appSettingsService.apiUrl}/clients/${client.id}`, client);
  }

  updateClient(client: ClientModel): any {
    return this.http.put(`${this.appSettingsService.apiUrl}/clients/${client.id}`, client);
  }

  addNewClient(client: ClientModel): any {
    return this.http.post(`${this.appSettingsService.apiUrl}/clients/`, client);
  }


}
