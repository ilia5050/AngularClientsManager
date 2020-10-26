import { Pipe, PipeTransform } from '@angular/core';
import { MessageGeneratorService } from '../services/message-generator.service';

@Pipe({
  name: 'MessageGenerator'
})
export class MessageGeneratorPipe implements PipeTransform {

  constructor(private messageGeneratorService: MessageGeneratorService) {
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.messageGeneratorService.getMessageValue(value);
  }

}
