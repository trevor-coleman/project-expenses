import { Db, FilterQuery, QuerySelector } from 'mongodb';
import mongodb from 'mongodb';
import { UniqueConstraintError } from '../../server/helpers/errors';
import { makeId } from 'database.ts';
import Project, { IProjectData, IProjectParams } from '../AProject';

export default class ProjectList {

    database: Db;

    constructor({database}:{database: Db}) {
        this.database = database;
    }

    async getItems ({ max = 100, before, after }:{max?:number; before?: number; after?: number} = {}) {
        const db = await this.database

        const query: FilterQuery<QuerySelector<any>> = {_id:{}}
        if (before || after) {
            query._id = {}
            query._id = before ? { ...query._id, $lt: makeId(before) } : query._id
            query._id = after ? { ...query._id, $gt: makeId(after) } : query._id
        }

        return (await db
            .collection('contacts')
            .find(query)
            .limit(Number(max))
            .toArray()).map((projectData: IProjectData)=> {return new Project(projectData);});
    }

    async add (projectData: IProjectParams) {
        const {_id} = projectData;
        const db = await this.database
        if (_id) {
            projectData._id = makeId(_id)
        }
        const { result, ops } = await db
            .collection('contacts')
            .insertOne(projectData)
            .catch(mongoError => {
                const [errorCode] = mongoError.message.split(' ')
                if (errorCode === 'E11000') {
                    const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
                    throw new UniqueConstraintError(
                        mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
                    )
                }
                throw mongoError
            })
        return {
            success: result.ok === 1,
            created: new Project(ops[0])
        }
    }


}