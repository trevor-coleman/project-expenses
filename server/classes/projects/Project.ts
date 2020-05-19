import { Dinero } from 'dinero.js'
import { DatabaseIdType } from '../index';


export interface IProject {
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    startDate: Date;
    endDate: Date;
    name:string;
    totalRevenue: Dinero;
    totalHSTCollected: Dinero;
    totalHSTSpent: Dinero;
    totalExpenses: Dinero;
    incomeTaxRate: number;
    numberOfOrders: number;
}

export default class Project {
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    startDate: Date;
    endDate: Date;
    name: string;
    totalRevenue: Dinero;
    totalHSTCollected: Dinero;
    totalHSTSpent: Dinero;
    totalExpenses: Dinero;
    incomeTaxRate: number;
    numberOfOrders: number;

    constructor({
                    _id = "", userId, name, startDate, endDate,
                    totalRevenue, totalHSTCollected, totalHSTSpent,
                    totalExpenses, incomeTaxRate, numberOfOrders,
                }: IProject)
    {
        this._id = _id +"";
        this.userId = userId;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.name = name;
        this.totalRevenue = totalRevenue;
        this.totalHSTCollected = totalHSTCollected;
        this.totalHSTSpent = totalHSTSpent;
        this.totalExpenses = totalExpenses;
        this.incomeTaxRate = incomeTaxRate;
        this.numberOfOrders = numberOfOrders;
    }
}