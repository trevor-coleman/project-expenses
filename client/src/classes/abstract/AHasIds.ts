import { DatabaseIdType } from '../index';

export default abstract class AHasIds {
    _id: DatabaseIdType;
    userId?: DatabaseIdType;
    projectId?: DatabaseIdType;

    protected constructor({_id, userId, projectId}: IHasIds) {
        this._id = _id;
        this.userId = userId;
        this.projectId = projectId;
    }
}

export interface IHasIds {
    _id: DatabaseIdType;
    userId?: DatabaseIdType;
    projectId?: DatabaseIdType;
}
