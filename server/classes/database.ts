import { DatabaseIdType, Money } from './';
import { Db, MongoClient, ObjectId } from 'mongodb';
import validator from 'validator';

const isISO8601 = validator.isISO8601;

export default class Database {

    static async makeDb(): Promise<Db> {
        const url = "mongodb://127.0.0.1:27017"; //mongoServerUrl;
        const dbName = 'project_expenses';
        const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        return client.db(dbName);
    }

    static makeId(id?: DatabaseIdType): ObjectId {
        try {
            const newId = id !== ""
                          ? new ObjectId(id)
                          : new ObjectId();
            return newId;
        } catch (e) {
            throw new Error("invalid Ids failed -- " + e.message);
        }
    };

    static makeIds(ids: DatabaseIdType[]): DatabaseIdType[] {
        return ids.map((id) => {return Database.makeId(id);});
    }

    static stringifyIds(ids: DatabaseIdType[]) {
        return ids.map((id: DatabaseIdType) => {return id.toString();});
    }

    public static validateIds(ids: DatabaseIdType[]): void {
        try {
            this.makeIds(ids);
        } catch (e) {
            throw new Error("validate Ids failed -- " + e.message);
        }

    }

    public static validateDate(date: string | Date): string | Date {
        try {
            if (typeof date === 'string') {
                if (!isISO8601(date)) {
                    throw new Error("String - Failed ISO Validation");
                }
                return date;
            } else {
                new Date(date);
            }
        } catch (e) {
            throw new Error("Date is not valid ISOString or Date - " + e);
        }
        return date;
    }

    public static validateId(id: string): DatabaseIdType {
        try {
            this.makeId(id);
        } catch (e) {
            throw new Error("validate Ids failed -- " + e.message);
        }
        return id;
    }

    public static createFromHexString(_id: string): any {
        return ObjectId.createFromHexString(_id);
    }

    public static validateMoney(object: Money): Money {
        if (!('amount' in object && 'currency' in object)) {
            throw new Error("not a valid Money object");
        }
        return object;
    }

    public static validatePercent(percent: number): number {
        if (percent < 0 || percent > 1) {
            throw new Error("percent argument out of bounds");
        }
        return percent;
    }

    public static validateNumber(item: any): number {
        if (!(typeof item === 'number')) {
            throw new Error("is not a number");
        }
        return item;

    }
}