import mongodb, { Db, MongoClient, ObjectId } from 'mongodb';
import { mongoServerUrl } from '../config/config';

export type DatabaseIdType = mongodb.ObjectId | string | number
export type DatabaseType = Db;


export default class Database {

    static async makeDb(): Promise<Db> {
        const url = "mongodb://127.0.0.1:27017" //mongoServerUrl;
        const dbName = 'project_expenses'
        const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true})
        await client.connect()
        return client.db(dbName);
    }

    static makeId(id: string | number | ObjectId ): string | number | ObjectId {
        return new mongodb.ObjectID(id)
    };

    public static newID(): any {
        return new mongodb.ObjectID();
    }
}