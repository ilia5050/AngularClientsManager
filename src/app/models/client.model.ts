import { ClientActualAddressModel } from './client-actual-address.model';
import { ClientLegalAddressModel } from './client-legal-address.model';
import { ClientSexEnum } from './client-sex.enum';

export class ClientModel {
    id: number;
    Name: string;
    LastName: string;
    Sex: ClientSexEnum;
    PersonalId: string;
    Mobile: string;
    LegalAddress: ClientLegalAddressModel;
    ActualAddress: ClientActualAddressModel;
    Photo: string;
    Deleted: number;
}

export enum ClientDeleteStatusEnum {
    NotDeleted,
    Deleted
} 
