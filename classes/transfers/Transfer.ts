import { TaxType } from '../';
import { Dinero } from 'dinero.js';
import AHasIds, {IHasIds } from '../abstract/AHasIds';

export interface ITransfer extends IHasIds{
    date: Date;
    taxType: TaxType;
    amount: Dinero;
    fromAccount: string;
    toAccount: string;
}

export default class Transfer extends AHasIds{
    date: Date;
    taxType: TaxType;
    amount: Dinero;
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

