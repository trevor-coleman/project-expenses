import { OrderItem, PaymentMethod } from '../';
import {Dinero} from 'dinero.js';
import AHasIds, {IHasIds } from '../abstract/AHasIds';

export interface IOrder extends IHasIds{
    customerId: string;
    vendor: string;
    items: OrderItem[];
    paid: boolean;
    paymentMethod: PaymentMethod | null;
    subtotal: Dinero;
    hst: Dinero;
}

export default class Order extends AHasIds{
    customerId: string;
    vendor: string;
    items: OrderItem[];
    paid: boolean;
    paymentMethod: PaymentMethod | null;
    subtotal: Dinero;
    hst: Dinero;

    constructor({_id, userId, customerId, vendor, projectId, items, paid, paymentMethod, subtotal, hst}: IOrder) {
        super({_id, userId, projectId});
        this.customerId = customerId;
        this.vendor = vendor;
        this.items = items;
        this.paid = paid;
        this.paymentMethod = paymentMethod;
        this.subtotal = subtotal;
        this.hst = hst;
    }
}

