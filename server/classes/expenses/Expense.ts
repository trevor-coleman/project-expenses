import { Dinero } from 'dinero.js';
import AHasIds, { IHasIds } from '../abstract/AHasIds';

export interface IExpense extends IHasIds{
    date: moment.Moment;
    description: string;
    vendor: string;
    amount: Dinero;
    hst: Dinero;
}

export default class Expense extends AHasIds {
    date: moment.Moment;
    description: string;
    vendor: string;
    amount: Dinero;
    hst: Dinero;

    constructor({_id, date, userId, projectId, description, vendor, amount, hst}: IExpense) {
        super({_id, userId, projectId});
        this.description = description;
        this.vendor = vendor;
        this.amount = amount;
        this.hst = hst;
        this.date = date;

    }
}

