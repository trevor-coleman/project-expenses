import { Money, Currencies } from 'ts-money';
import { CAD } from '../CAD';


export interface IProject {
    _id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalRevenue: number;
    totalHSTCollected: number;
    totalHSTSpent: number;
    totalExpenses: number;
    incomeTaxRate: number;
    numberOfOrders: number;
}

export default class Project {
    _id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalRevenue: CAD;
    totalHSTCollected: CAD;
    totalHSTSpent: CAD;
    totalExpenses: CAD;
    incomeTaxRate: number;
    numberOfOrders: number;

    constructor({
                    _id = "", userId, startDate, endDate,
                    totalRevenue, totalHSTCollected, totalHSTSpent,
                    totalExpenses, incomeTaxRate, numberOfOrders,
                }: IProject)
    {
        this._id = _id +"";
        this.userId = userId;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.totalRevenue = new CAD(totalRevenue);
        this.totalHSTCollected = new CAD(totalHSTCollected);
        this.totalHSTSpent = new CAD(totalHSTSpent);
        this.totalExpenses = new CAD(totalExpenses);
        this.incomeTaxRate = incomeTaxRate;
        this.numberOfOrders = numberOfOrders;
    }
}