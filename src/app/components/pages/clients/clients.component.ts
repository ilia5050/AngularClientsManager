import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountModel } from 'src/app/models/account.model';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  host: {'class': 'app-main__outer'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit {

  clients: ClientModel[];

  accounts: AccountModel[];

  constructor(private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef) { 
  }

  ngOnInit(): void {

    this.clients = this.activatedRoute.snapshot.data['data'];

    this.accounts = this.activatedRoute.snapshot.data['accounts'];

  }
  

}
