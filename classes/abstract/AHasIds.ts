export default abstract class AHasIds {
    _id: string;
    userId?: string;
    projectId?: string;

    protected constructor({_id, userId, projectId}: IHasIds) {
        this._id = _id;
        this.userId = userId;
        this.projectId = projectId;
    }
}

export interface IHasIds {
    _id: string;
    userId?: string;
    projectId?: string;
}
