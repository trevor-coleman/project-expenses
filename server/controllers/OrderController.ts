import { Money } from 'classes';
import { CategoryTotals } from 'classes/Schema';
import { Request, Response } from 'express';
import { ListCreatedResult } from 'models/ADbList';
import OrderList from 'models/OrderList';
import OrderFactory, { OrderSchema, OrderType } from '../classes/orders/OrderFactory';
import Database from '../classes/database';

const db = Database.makeDb()
const orderList = new OrderList({ db })

type CreateOrderResult = ListCreatedResult<OrderType>

export default class OrderController {
    public validateSchema(schema: any): OrderSchema {
        return OrderFactory.validateSchema(schema);
    }

    static async create (req: Request, res: Response)  {
        let result: CreateOrderResult | null = null;

        console.log("REQ BODY:", req.body)

        try {
            if (!req.body) {
                res.send("Bad request").status(400)
            }

            const schema:OrderSchema = OrderFactory.validateSchema(req.body)
            console.log("==>", schema)
            result = await orderList.create(schema);
            if(result){
                res.send(result.created).status(200);}
            else{
                res.send("Create failed.").status(500)
            }

        } catch (e) {
            res.send(e.message).status(400);
        }

    }

    static async findById(req: Request, res: Response) {
        try{
            const id = req.params.orderId;
            const result = await orderList.findById(id)
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }
        } catch(e) {
            res.send("Bad request").status(400)
        }
    }

    static async getByUserId(req: Request, res: Response){
        try{
            const {userId} = req.params;
            const result = await orderList.findProjectsByUserId(userId)
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }
        } catch(e) {
            res.send("Bad request").status(400)
        }
    }

    public static async getByProjectId(req: Request, res: Response){
        try{
            const {projectId: projectId} = req.params;
            const result = await orderList.findOrdersByProjectId(projectId)
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }
        } catch(e) {
            res.send("Bad request").status(400)
        }

    }

    public static async getTotalOrdersByProject(projectId:string): Promise<CategoryTotals | null> {
        const result = await orderList.getTotalOrdersByProjectId(projectId);

        return result;
    }
}

