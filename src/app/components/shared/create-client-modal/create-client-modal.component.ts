import { ThrowStmt } from '@angular/compiler';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { ClientActualAddressModel } from 'src/app/models/client-actual-address.model';
import { ClientLegalAddressModel } from 'src/app/models/client-legal-address.model';
import { ClientSexEnum } from 'src/app/models/client-sex.enum';
import { ClientModel } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-create-client-modal',
  templateUrl: './create-client-modal.component.html',
  styleUrls: ['./create-client-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateClientModalComponent implements OnInit, OnDestroy {
  @Input()
  client: ClientModel;
  @Input() 
  openCreateClientModalSubject$: Observable<string>;
  @ViewChild('createClientmodal')
  private createClientmodal: any;
  form: FormGroup;
  editMode = false;
  sexData = [ 
    { Name: 'კაცი', Id: 1 },
    { Name: 'ქალი', Id: 2 }
  ];
  clientCreateSuccessfullyStatus=  false;
  private subscribers: any = {};

  constructor(private cd: ChangeDetectorRef, private modalService: NgbModal, private readonly fb: FormBuilder, private clientsService: ClientsService) {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50), onlylatinAndGeorgianValidator]],      
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50), onlylatinAndGeorgianValidator]],
      sex: [null, [Validators.required]],
      personalId: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), onlyNumbersValidator]],
      mobile: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9),onlyNumbersValidator, startWith5Validator]],
      legalAddressCountry: [null, [Validators.required]],
      legalAddressCity: [null, [Validators.required]],
      legalAddressAddress: [null, [Validators.required]],
      actualAddressCountry: [null, [Validators.required]],
      actualAddressCity: [null, [Validators.required]],
      actualAddressAddress: [null, [Validators.required]]
    });
   }

  ngOnInit(): void {

    this.subscribers.openModal = this.openCreateClientModalSubject$.subscribe(string => {
      if (string === 'edit') {
        this.recoverFormByClientForEditMode();
        this.editMode = true;  
      } else {
        this.editMode = false;
      }
      this.openCreateClientModalFromSubscribe();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this.unsubscribeSubscribers();    
  }

  unsubscribeSubscribers(): void {
    for (const key in this.subscribers) {
      if (this.subscribers[key]) {
        this.subscribers[key].unsubscribe();
      }
    }
  }

  recoverFormByClientForEditMode() {
    this.form.controls['firstName'].setValue(this.client.Name);
    this.form.controls['lastName'].setValue(this.client.LastName);
    this.form.controls['sex'].setValue(this.client.Sex);
    this.form.controls['personalId'].setValue(this.client.PersonalId);
    this.form.controls['mobile'].setValue(this.client.Mobile);
    this.form.controls['legalAddressCountry'].setValue(this.client.LegalAddress.Country);
    this.form.controls['legalAddressCity'].setValue(this.client.LegalAddress.City);
    this.form.controls['legalAddressAddress'].setValue(this.client.LegalAddress.Address);
    this.form.controls['legalAddressCountry'].setValue(this.client.LegalAddress.Country);
    this.form.controls['legalAddressCity'].setValue(this.client.LegalAddress.City);
    this.form.controls['legalAddressAddress'].setValue(this.client.LegalAddress.Address);
    this.form.controls['actualAddressCountry'].setValue(this.client.ActualAddress.Country);
    this.form.controls['actualAddressCity'].setValue(this.client.ActualAddress.City);
    this.form.controls['actualAddressAddress'].setValue(this.client.ActualAddress.Address);
  }

  openCreateClientModalFromSubscribe(): void {
    this.clientCreateSuccessfullyStatus = false;
    this.modalService.open(this.createClientmodal, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.clientCreateSuccessfullyStatus = false;
    }, (reason) => {
      this.clientCreateSuccessfullyStatus = false
    });
  }

  addClientRequest(): void {    
    if (this.form.valid) {      
      const newClient = this.generateNewClientByFormGroup();
      this.clientsService.addNewClient(newClient).subscribe(() => {
        this.clientCreateSuccessfullyStatus = true;
        this.form.reset();
        this.cd.detectChanges();
      }, err => {
        console.log(err)
      });
    } else {
      alert('გთხოვთ გადაამოწმოთ შეყვანილი მონაცემები');
    }
  }

  editClientRequest(): void {
    if (this.form.valid) {      
      const newClient = this.generateNewClientByFormGroup();
      this.clientsService.updateClient(newClient).subscribe(() => {
        this.clientCreateSuccessfullyStatus = true;
        this.form.reset();
        this.cd.detectChanges();
      }, err => {
        console.log(err)
      });
    } else {
      alert('გთხოვთ გადაამოწმოთ შეყვანილი მონაცემები');
    }
  }

  generateNewClientByFormGroup(): ClientModel{    
    const client = new ClientModel();
    client.Name = this.form.get('firstName').value;
    client.LastName = this.form.get('lastName').value;
    client.Sex = this.form.get('sex').value;
    client.PersonalId = this.form.get('personalId').value;
    client.Mobile = this.form.get('mobile').value;
    client.Name = this.form.get('firstName').value;
    client.Name = this.form.get('firstName').value;
    client.Name = this.form.get('firstName').value; 
    client.LegalAddress = new ClientLegalAddressModel(); 
    client.LegalAddress.Country = this.form.get('legalAddressCountry').value; 
    client.LegalAddress.City = this.form.get('legalAddressCity').value; 
    client.LegalAddress.Address = this.form.get('legalAddressAddress').value; 
    client.ActualAddress = new ClientActualAddressModel();
    client.ActualAddress.Country = this.form.get('actualAddressCountry').value; 
    client.ActualAddress.City = this.form.get('actualAddressCity').value; 
    client.ActualAddress.Address = this.form.get('actualAddressAddress').value; 
    client.Photo = (client.Sex === ClientSexEnum.Male) ? '9.jpg' : '10.jpg';
    client.Deleted = 0;
    if (this.editMode) {
      client.id = this.client.id;
    }
    return client;
  }
}

function onlylatinAndGeorgianValidator(control: FormControl) { 
  const inputtxt = control.value;
  if (!inputtxt) {
    return;
  }
  var letters = /^[A-Za-z]+$/;
  var lettersGe = /^[აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ]+$/;
  if (inputtxt.match(letters) && !inputtxt.match(lettersGe)) {
    return true;
  }  
  if (!inputtxt.match(letters) && inputtxt.match(lettersGe)) {
    return true;
  }
  return {
    onlylatinAndGeorgian: {}
  };
}

function onlyNumbersValidator(control: FormControl) {
  const inputtxt = control.value;
  if (!inputtxt) {
    return;
  }
  var numbers = /^[0-9]+$/;
  if (inputtxt.match(numbers)) {
    return true;
  }
  return {
    onlyNumbers: {}
  };
}

function startWith5Validator(control: FormControl) {
  const inputtxt = control.value;
  if (!inputtxt) {
    return;
  }
  if (inputtxt.charAt(0) == 5) {
    return true;
  }
  return {
    startWith5Number: {}
  };
}
