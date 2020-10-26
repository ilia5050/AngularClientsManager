import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients-filter',
  templateUrl: './clients-filter.component.html',
  styleUrls: ['./clients-filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsFilterComponent implements OnInit {

  clientFilterform: FormGroup;

  constructor(private readonly fb: FormBuilder, private clientsService: ClientsService, private cd: ChangeDetectorRef) { 

    this.clientFilterform = this.fb.group({
      firstName: [null, [Validators.minLength(2), Validators.maxLength(50), onlylatinAndGeorgianValidator]], 
      lastName: [null, [Validators.minLength(2), Validators.maxLength(50), onlylatinAndGeorgianValidator]],
      personalId: [null, [Validators.minLength(11), Validators.maxLength(11), onlyNumbersValidator]],
      mobile: [null, [Validators.minLength(9), Validators.maxLength(9),onlyNumbersValidator, startWith5Validator]]
    });
  }

  ngOnInit(): void {
    this.recoverSessionStorageData();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    event.preventDefault();
    const data = {
        firstName: this.clientFilterform.controls['firstName'].value, 
        lastName: this.clientFilterform.controls['lastName'].value,
        personalId: this.clientFilterform.controls['personalId'].value,
        mobile: this.clientFilterform.controls['mobile'].value
    }
    sessionStorage.setItem('ClientsDataForm', JSON.stringify(data));
  }
  
  recoverSessionStorageData(): void {
    const data = sessionStorage.getItem('ClientsDataForm');
    if (!data) {
      return;
    }
    const dataParsed = JSON.parse(data);
    this.clientFilterform.controls['firstName'].setValue(dataParsed.firstName);
    this.clientFilterform.controls['lastName'].setValue(dataParsed.lastName);
    this.clientFilterform.controls['personalId'].setValue(dataParsed.personalId);
    this.clientFilterform.controls['mobile'].setValue(dataParsed.mobile);
    sessionStorage.setItem('ClientsDataForm', '');
    this.cd.detectChanges();
  }

  searchRequest(): void {

    if (this.clientFilterform.valid) {
      
      const searchData = this.generateSearchData(this.clientFilterform.getRawValue());

      this.clientsService.searchClient(searchData).subscribe(data => {

        this.clientsService.showResultAfterFilter({ SearchData: searchData, Results: data });

        this.cd.detectChanges();        

      }, err => {
        console.log(err)
      });
    } else {
      alert('გთხოვთ გადაამოწმოთ შეყვანილი მონაცემები');
    }
  }

  generateSearchData(rowData: any): string {    
    let result = '';
    if (rowData.firstName) {
      result += '&Name='+ rowData.firstName;
    }
    if (rowData.lastName) {
      result += '&LastName='+ rowData.lastName;
    }
    if (rowData.personalId) {
      result += '&PersonalId='+ rowData.personalId;
    }
    if (rowData.mobile) {
      result += '&Mobile='+ rowData.mobile;
    }
    return result;
  }

  clearFormData(): void {
    this.clientFilterform.reset();
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