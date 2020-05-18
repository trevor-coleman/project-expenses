import { Request, Response } from 'express';
import { ListCreatedResult } from 'models/ADbList';
import ExpenseList from 'models/ExpenseList';
import ExpenseFactory, { ExpenseSchema, ExpenseType } from '../classes/expenses/ExpenseFactory';
import Database from '../classes/database';

const db = Database.makeDb()
const expenseList = new ExpenseList({ db })

type CreateExpenseResult = ListCreatedResult<ExpenseType>

export default class ExpenseController {
    public validateSchema(schema: any): ExpenseSchema {
        return ExpenseFactory.validateSchema(schema);
    }

    static async create (req: Request, res: Response)  {
        let result: CreateExpenseResult | null = null;

        console.log("REQ BODY:", req.body)

        try {
            if (!req.body) {
                res.send("Bad request").status(400)
            }

            const schema:ExpenseSchema = ExpenseFactory.validateSchema(req.body)
            console.log("==>", schema)
            result = await expenseList.create(schema);
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
            const id = req.params.expenseId;
            const result = await expenseList.findById(id)
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
            const result = await expenseList.findProjectsByUserId(userId)
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
            const result = await expenseList.findExpensesByProjectId(projectId)
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }
        } catch(e) {
            res.send("Bad request").status(400)
        }

    }
}

