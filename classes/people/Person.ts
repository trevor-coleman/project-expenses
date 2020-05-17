import { DatabaseIdType } from 'database';
import AHasIds, { IHasIds } from '../abstract/AHasIds';

export interface IPerson extends IHasIds{
    name: string;
    email: string;
    customerOf: string[];
}

export default class Order extends AHasIds{
    name: string;
    email: string;
    customerOf: string[];

    constructor({_id, userId, projectId, name, email, customerOf}: IPerson) {
        super({_id, userId, projectId });
        this.name = name;
        this.email = email;
        this.customerOf = customerOf;
    }
}

