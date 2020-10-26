import { AccountBalance } from './account-balance.model';
import { AccountStatusEnum } from './account-status.enum';
import { AccountTypeEnum } from './account-type.enum';

export class AccountModel {
    id: number;
    ClientId: number;
    Type: AccountTypeEnum;
    Balance: AccountBalance[];
    Status: AccountStatusEnum;
}
