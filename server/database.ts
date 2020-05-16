import mongodb, { Db, MongoClient, ObjectId } from 'mongodb';
import { mongoServerUrl } from '../config/config';

export default async function makeDb (): Promise<Db> {
    const url = mongoServerUrl;
    const dbName = 'project_expenses'
    const client = new MongoClient(url, { useNewUrlParser: true })
    await client.connect()
    return client.db(dbName);
}

export function makeId (id:string | number | ObjectId): string | number | ObjectId {
    return new mongodb.ObjectID(id)
};

