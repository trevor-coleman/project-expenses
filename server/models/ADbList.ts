import {
    DeleteWriteOpResultObject,
    FilterQuery,
    InsertOneWriteOpResult,
    QuerySelector, UpdateOneOptions, UpdateQuery,
    UpdateWriteOpResult,
} from 'mongodb';
import { UniqueConstraintError } from '../../classes/errors';

import Database, { DatabaseType } from '../database';

export interface ListResult
{
    success: boolean;
}

export interface ListReplaceResult<Item> extends ListResult {
}

export interface ListAddResult<Item> extends ListResult {
    created: Item;
}

export interface ListRemoveResult extends ListResult {
    n: number;
}

interface ListUpdateResult extends ListResult {
    scanned: number;
    modified: number;
}

export interface IHasId {
    _id: any;
}

export interface IList<Item, ItemSchema, ItemInterface> {
    add: (item: Item) => Promise<ListAddResult<Item>>
    findById: ({_id}: { _id: string }) => Promise<Item | null>;
    getItems: (pagedGetItemsInfo: IPagedGetItemsInfo) => Promise<Item[]>;
    remove: (item: Item) => Promise<ListRemoveResult>
    replace: (item: Item) => Promise<ListReplaceResult<Item>>;
    update: (filter: FilterQuery<ItemSchema>, update: UpdateQuery<ItemSchema> | Partial<ItemSchema>, updateOneOptions?: UpdateOneOptions) => Promise<ListUpdateResult>;
}

export interface IItemFactory<Item> {
    make: () => Item;
}

export interface IItemSchema extends IHasId {

}

export interface IPagedGetItemsInfo {
    max?: number;
    before?: number;
    after?: number
}

export default abstract class ADbList<Item extends IHasId, ItemSchema extends IItemSchema, ItemInterface extends IHasId>
    implements IList<Item, ItemSchema, ItemInterface> {

    db: Promise<DatabaseType>;

    constructor({db}: { db: Promise<DatabaseType> }) {
        this.db = db;
    }

    async findById({_id}: { _id: string }): Promise<Item | null> {
        const db = await this.db;
        const found = await db
            .collection(this.collectionName())
            .findOne({_id: Database.makeId(_id)});
        if (found) {
            return this.make(found);
        }
        return null;
    }

    async remove({_id}: { _id: string }): Promise<ListRemoveResult> {
        const db = await this.db;
        const removeResult: DeleteWriteOpResultObject = await db.collection(this.collectionName())
                                                                .deleteOne({_id: Database.makeId(_id)});
        const {result} = removeResult;
        const {ok, n} = result;
        return {
            success: ok === 1,
            n: n ? n : 0,
        };
    }

    async replace(item: Item): Promise<ListReplaceResult<Item>> {
        const db = await this.db;
        return new Promise<ListReplaceResult<Item>>(function (p1: (value?: (PromiseLike<ListReplaceResult<Item>> | ListReplaceResult<Item>)) => void,
                                                              p2: (reason?: any) => void)
        {});
    }

    async update(filter: FilterQuery<ItemSchema>, update: UpdateQuery<ItemSchema> | Partial<ItemSchema>, updateOneOptions?: UpdateOneOptions): Promise<ListUpdateResult> {
        const db = await this.db;
        const updateResult: UpdateWriteOpResult = await db.collection(this.collectionName()).updateOne(filter, update,updateOneOptions)
        const {result} = updateResult;
        const {ok, n, nModified} = result

        return {
            success: ok ===1,
            scanned: n,
            modified: nModified,
        }

    }

    async getItems({max = 100, before, after}: IPagedGetItemsInfo = {}): Promise<Item[]> {
        const db = await this.db;

        const query: FilterQuery<QuerySelector<IPagedGetItemsInfo>> = {_id: {}};
        if (before || after) {
            query._id = {};
            query._id = before ? {...query._id, $lt: Database.makeId(before)} : query._id;
            query._id = after ? {...query._id, $gt: Database.makeId(after)} : query._id;
        }

        return (await db
            .collection(this.collectionName())
            .find(query)
            .limit(Number(max))
            .toArray()).map((projectSchema: ItemSchema) => {return this.make(projectSchema);});
    }

    async add(item: ItemSchema): Promise<ListAddResult<Item>> {
        console.log(this.collectionName() + " ======= adding\n", item)

        const {_id} = item;
        if (_id) {
            item._id = Database.newID();
        }
        const db = await this.db;


        console.log("made id", item)

        const {result, ops}: InsertOneWriteOpResult<ItemSchema> = await db
            .collection(this.collectionName())
            .insertOne(item)
            .catch(mongoError => {
                const [errorCode] = mongoError.message.split(' ');
                if (errorCode === 'E11000') {
                    const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ');
                    throw new UniqueConstraintError(mongoIndex);
                }
                throw mongoError;
            });

        console.log("And we're here")
        return {
            success: result.ok === 1,
            created: this.make(ops[0]),
        };
    }

    abstract make(itemSchema: ItemSchema): Item;

    abstract collectionName(): string;

}