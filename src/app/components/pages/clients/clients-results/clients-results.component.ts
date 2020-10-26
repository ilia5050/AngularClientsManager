import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ClientModel } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-results',
  templateUrl: './clients-results.component.html',
  styleUrls: ['./clients-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsResultsComponent implements OnInit {
  @Input()
  clients: ClientModel[];
  form: FormGroup;
  pagination = {
    page: 1,
    pages: 0,
    limit: 10,
    allDataCount: 0,
    isSortedId: false,
    searchData: ''
  }
  sessionStorageData: { pagination: any, clients: ClientModel[] } = { pagination: null, clients: []}
  openCreateClientModalSubject: Subject<void> = new Subject<void>();
  private subscribers: any = {};

  constructor(private readonly fb: FormBuilder, private clientsService: ClientsService, private cd: ChangeDetectorRef) { 
    this.form = this.fb.group({
      type: [null, [Validators.required]],      
      currency: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {   
    this.generatePagination();
    this.recoverSessionStorageData();
    this.subscribers.showResultAfterFilter = this.clientsService.showResultAfterFilter$.subscribe(data => {
      this.showResultAfterFilterFromSubsciber(data);
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribeSubscribers();    
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    this.sessionStorageData.pagination =  this.pagination;
    this.sessionStorageData.clients = this.clients;
    sessionStorage.setItem('ClientsData', JSON.stringify(this.sessionStorageData));
  }

  recoverSessionStorageData(): void {
    const data = sessionStorage.getItem('ClientsData');
    if (!data) {
      return;
    }
    const dataParsed = JSON.parse(data);
    this.clients = dataParsed.clients;
    this.pagination = dataParsed.pagination;
    this.pageChange(this.pagination.page);
    sessionStorage.setItem('ClientsData', '');
    this.cd.detectChanges();
  }

  unsubscribeSubscribers(): void {
    for (const key in this.subscribers) {
      if (this.subscribers[key]) {
        this.subscribers[key].unsubscribe();
      }
    }
  }

  generatePagination(): void {
    this.pagination.allDataCount = this.clients.length;
    this.pagination.pages = parseInt(String(this.pagination.allDataCount / this.pagination.limit))+2;
    this.pageChange(this.pagination.page);
  }

  pageChange(page: number): void {    
    this.pagination.page = page;    
    this.clientsService.getClients(page, this.pagination.isSortedId, this.pagination.limit, this.pagination.searchData).subscribe(data => {
      this.clients = data;
      this.cd.detectChanges();
    }); 
  }

  sortById(): void {
    this.pagination.isSortedId = !this.pagination.isSortedId;
    this.pageChange(this.pagination.page);
  }

  showResultAfterFilterFromSubsciber(data: { SearchData: string, Results: ClientModel[] }): void {
    this.clients = data.Results;
    this.pagination.page = 1;
    this.pagination.allDataCount = this.clients.length;
    this.pagination.pages = parseInt(String(this.pagination.allDataCount / this.pagination.limit))+2;
    this.pagination.isSortedId = false;
    this.pagination.searchData = data.SearchData
  }

  addClientModalOpen(): void {
    this.openCreateClientModalSubject.next();
  }

  
}
