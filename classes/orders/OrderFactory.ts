
import database from 'database';
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
            subtotal: Dinero(subtotal),
            hst: Dinero(hst),
            paid,
            paymentMethod,
        };

        return new Order(newOrderData);
    }

    public static makeSchema(order: OrderType): OrderSchema {
        const {_id, userId, vendor, projectId, customerId, items, subtotal, hst, paid, paymentMethod} = order;

        const orderSchema: OrderSchema = {
            _id: database.makeId(_id),
            userId: database.makeId(userId),
            projectId: database.makeId(projectId),
            customerId: database.makeId(customerId),
            items,
            vendor,
            subtotal: subtotal.toObject(),
            hst: hst.toObject(),
            paid,
            paymentMethod,
        };

        return orderSchema;
    }
}