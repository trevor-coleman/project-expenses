import { CategoryTotals, ProjectSummaryTotals } from 'classes/Schema';
import ExpenseController from 'controllers/ExpenseController';
import OrderController from 'controllers/OrderController';
import {Request, Response} from 'express';
import ExpenseList from 'models/ExpenseList';
import ProjectList, { CreateProjectResult } from 'models/ProjectList';
import ProjectFactory, { ProjectSchema } from '../classes/projects/ProjectFactory';
import Database from '../classes/database';

const db = Database.makeDb()
const projectList = new ProjectList({ db })

export default class ProjectController{
    static async create (req: Request, res: Response)  {
        let result: CreateProjectResult | null = null;

        try {
            if (!req.body) {
                res.send("Bad request").status(400)
            }

            const schema = ProjectFactory.validateSchema(req.body)
            result = await projectList.create(schema);


        } catch (e) {
            res.send(e.message).status(400);
        }
        if(result){
        res.send(result.created).status(200);}
        else{
            res.send("Create failed.").status(500)
        }
    }

    static async findById(req: Request, res: Response) {
        try{
            const id = req.params.projectId;
            const result = await projectList.findById(id)
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
            const result = await projectList.findProjectsByUserId(userId)
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }
        } catch(e) {
            res.send("Bad request").status(400)
        }
    }

    static async getTotals(req:Request, res: Response){
        try{
            const {projectId} = req.params;
            const totalExpenses: CategoryTotals | null = await ExpenseController.getTotalExpensesByProject(projectId)
            const totalOrders: CategoryTotals | null = await OrderController.getTotalOrdersByProject(projectId)
            const result : ProjectSummaryTotals ={
                _id: projectId,
                expenses: totalExpenses,
                orders: totalOrders,
            }
            console.log(result);
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }

        } catch (e) {
            res.send("Bad request").status(400)
        }
    }

}

