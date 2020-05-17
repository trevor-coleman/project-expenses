import { TaxType } from 'classes/';
import AHasIds, {IHasIds } from '../abstract/AHasIds';
import { CAD } from '../CAD';

export interface ITransfer extends IHasIds{
    date: Date;
    taxType: TaxType;
    amount: CAD;
    fromAccount: string;
    toAccount: string;
}

export default class Transfer extends AHasIds{
    date: Date;
    taxType: TaxType;
    amount: CAD;
    fromAccount: string;
    toAccount: string;

    constructor({_id, userId, date, taxType, amount,fromAccount,toAccount}: ITransfer) {
        super({_id, userId});
        this.date = date;
        this.taxType = taxType;
        this.amount = amount;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
    }
}

