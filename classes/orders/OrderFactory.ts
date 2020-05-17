
import * as Schema from '../Schema';
import Order, { IOrder } from './Order';
import Dinero from 'dinero.js';

export type OrderSchema = Schema.Order;
export type OrderInterface = IOrder;
export type OrderType = Order

export default class OrderFactory {

    static makeOrder(orderSchema: OrderSchema): OrderType {
        const {_id, userId, vendor, projectId, customerId, items, subtotal, hst, paid, paymentMethod} = orderSchema;

        const newOrderData: OrderInterface = {
            _id: _id + "",
            userId: userId + "",
            projectId: projectId + "",
            customerId: customerId + "",
            items,
            vendor,
            subtotal: Dinero({amount: subtotal, currency:'CAD'}),
            hst: Dinero({amount: hst, currency:'CAD'}),
            paid,
            paymentMethod,
        };

        return new Order(newOrderData);
    }

}