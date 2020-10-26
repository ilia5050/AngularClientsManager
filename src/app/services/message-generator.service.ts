import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageGeneratorService {

  messages: {k: string, v: string}[] = [
    { k: 'message@error@clients@clients-detail@add-account-modal@type-is-required', v: 'ანგარიშის ტიპის ველი სავალდებულოა' },
    { k: 'message@error@clients@clients-detail@add-account-modal@currency-is-required', v: 'ვალუტის ველი სავალდებულოა' },
    { k: 'message@error@clients@create-client-modal@input-name', v: 'გთხოვთ შეყვანოთ სახელი' },
    { k: 'message@error@clients@create-client-modal@name-min-3', v: 'სახელი უნდა იყოს მინიმუმ 2 სიმბოლო' },
    { k: 'message@error@clients@create-client-modal@name-max-50', v: 'სახელი უნდა იყოს მაქსიმუმ 50 სიმბოლო' },
    { k: 'message@error@clients@create-client-modal@onlylathinorgeorgian', v: 'გთხოვთ, გამოიყენოთ მხოლოდ ლათინური ან მხოლოდ ქართული სიმბოლოები' },
    { k: 'message@error@clients@create-client-modal@input-lastname', v: 'გთხოვთ შეიყვანოთ გვარი' },
    { k: 'message@error@clients@create-client-modal@name-min-2', v: 'გვარი უნდა იყოს მინიმუმ 2 სიმბოლო' },
    { k: 'message@error@clients@create-client-modal@lastname-max-50', v: 'გვარი უნდა იყოს მაქსიმუმ 50 სიმბოლო' },
    { k: 'message@error@clients@create-client-modal@onlylathinorgeorgian', v: 'გთხოვთ, გამოიყენოთ მხოლოდ ლათინური ან მხოლოდ ქართული სიმბოლოები' },
    { k: 'message@error@clients@create-client-modal@select-sex', v: 'გთხოვთ აირჩიოთ სქესი' },
  ]

  constructor() { }

  getMessageValue(key: string): string {
    return this.messages.find(m => m.k === key).v;
  }


}
