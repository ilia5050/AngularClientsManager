import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { AccountModel } from 'src/app/models/account.model';

@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css'],
  host: {'class': 'app-main__outer'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsDetailComponent implements OnInit {
  client = new ClientModel();
  accounts: AccountModel[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.client = this.activatedRoute.snapshot.data['data'][0];
    this.accounts = this.activatedRoute.snapshot.data['accounts'];
  }


}
