import OrderFactory, { OrderSchema, OrderInterface, OrderType } from '../../classes/orders/OrderFactory'
import ADbList from './ADbList';

export default class OrderList extends ADbList<OrderType, OrderSchema, OrderInterface> {
    make(orderSchema:OrderSchema):OrderType{
        return OrderFactory.makeOrder(orderSchema);
    }

    public collectionName(): string {
        return 'orders';
    }

    public makeSchema(item: OrderType): OrderSchema {
        return OrderFactory.makeSchema(item);
    }
}