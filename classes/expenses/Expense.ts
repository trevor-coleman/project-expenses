import AHasIds, { IHasIds } from '../abstract/AHasIds';
import { CAD } from '../CAD';


export interface IExpense extends IHasIds{
    description: string;
    vendor: string;
    amount: CAD;
    hst: CAD;
}

export default class Expense extends AHasIds{
    description: string;
    vendor: string;
    amount: CAD;
    hst: CAD;
    constructor({_id, userId, projectId, description,vendor, amount, hst}:IExpense) {
        super({_id, userId, projectId });
        this.description = description;
        this.vendor = vendor;
        this.amount = amount;
        this.hst = hst;

    }
}

