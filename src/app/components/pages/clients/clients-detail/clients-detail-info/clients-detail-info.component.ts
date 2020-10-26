import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { ClientModel } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-detail-info',
  templateUrl: './clients-detail-info.component.html',
  styleUrls: ['./clients-detail-info.component.css'],
})
export class ClientsDetailInfoComponent implements OnInit {
  @Input()
  client: ClientModel;
  openCreateClientModalSubject: Subject<string> = new Subject<string>();
  deleteClientModalSuccessMessage = false;
  constructor(private modalService: NgbModal, private clientsService: ClientsService) { }

  ngOnInit(): void {
  }

  openDeleteClientModal(content: any): void {
    this.deleteClientModalSuccessMessage = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  deleteClientRequest(): void {
    this.clientsService.deleteClient(this.client).subscribe(() => {
      this.deleteClientModalSuccessMessage = true;
    }, err => {
      alert('დაფიქსირდა შეცდომა კლიენტის წაშლის დროს');
    });
  }

  addAccountModalOpenForEdit(): void {
    this.openCreateClientModalSubject.next('edit');
  }


}
