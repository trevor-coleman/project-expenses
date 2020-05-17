import { CAD } from '../CAD';
import * as Schema from '../Schema';
import Order, { IOrder } from './Order';

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
            subtotal: new CAD(subtotal),
            hst: new CAD(hst),
            paid,
            paymentMethod,
        };

        return new Order(newOrderData);
    }

}