import Expense from 'classes/expenses/Expense';
import Order from 'classes/orders/Order';
import { CategoryTotals } from 'classes/Schema';
import OrderFactory, { OrderSchema, OrderInterface, OrderType } from '../classes/orders/OrderFactory'
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

    public async findOrdersByProjectId(projectId: string): Promise<Order[] | null> {
        const db = await this.db;
        let collection: string = this.collectionName();
        const filter = {projectId: projectId};
        console.log('find by projectID:', filter);

        const found = await db
            .collection(collection)
            .find(filter).sort('date', -1);
        const foundArray: Order[] = await found.map(this.make).toArray();

        if (foundArray.length > 0) {
            return foundArray;
        }

        return null;
    }



    public async getTotalOrdersByProjectId(projectId: string): Promise<CategoryTotals | null> {

        let result: CategoryTotals[] | null = null;
        try {

            const db = await this.db;
            const collection = this.collectionName();
            const filter = {projectId: projectId};

            result = await db.collection(collection).aggregate([
                {
                    '$match': {
                        'projectId': '5ec1da9873b4e52eeab42349'
                    }
                }, {
                    '$group': {
                        '_id': null,
                        'amount': {
                            '$sum': '$subtotal.amount'
                        },
                        'hst': {
                            '$sum': '$hst.amount'
                        }
                    }
                }
            ]).toArray() as CategoryTotals[];

            return await result[0];

        } catch (e) {
            console.log(e);
        }

        return null;
    }

}