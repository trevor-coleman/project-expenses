import {Request, Response} from 'express';
import Database, { DatabaseType } from 'database';
import ADbList, { IHasId, IItemSchema, IList } from 'models/ADbList';
import { ProjectSchema } from '../../classes/projects/ProjectFactory';

const db = Database.makeDb()

type CreateItemResult<ItemSchema> = {
    success: any;
    created: ItemSchema;
}



export default abstract class AController<Item extends IHasId, ItemSchema, ItemInterface, ItemList extends IList<Item, IItemSchema, ItemInterface>>{

    abstract async getList(): Promise<ItemList>;

    async add (req: Request, res: Response)  {
        const itemList = await this.getList();
        let result: CreateItemResult<Item> | null = null;

        try {
            if (!req.body) {
                res.send("Bad request").status(400)
            }

            const schema = this.validateSchema(req.body)
            result = await itemList.create(schema);


        } catch (e) {
            res.send(e.message).status(400);
        }
        if(result){
            res.send(result.created).status(200);}
        else{
            res.send("Create failed.").status(500)
        }
    };

    async findById(req: Request, res: Response) {
        const itemList = await this.getList();
        try{
            const id = req.params.projectId;
            const result = await itemList.findById(id)
            if(result){
                res.send(result).status(200)
            } else {
                res.send(null).status(204)
            }
        } catch(e) {
            res.send("Bad request").status(400);
        }
    }

    abstract validateSchema(schema: any): ProjectSchema
}

