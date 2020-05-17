import { Dinero } from 'dinero.js'


export interface IProject {
    _id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalRevenue: Dinero;
    totalHSTCollected: Dinero;
    totalHSTSpent: Dinero;
    totalExpenses: Dinero;
    incomeTaxRate: number;
    numberOfOrders: number;
}

export default class Project {
    _id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalRevenue: Dinero;
    totalHSTCollected: Dinero;
    totalHSTSpent: Dinero;
    totalExpenses: Dinero;
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
        this.totalRevenue = totalRevenue;
        this.totalHSTCollected = totalHSTCollected;
        this.totalHSTSpent = totalHSTSpent;
        this.totalExpenses = totalExpenses;
        this.incomeTaxRate = incomeTaxRate;
        this.numberOfOrders = numberOfOrders;

        console.log("Project Constructor Complete")
    }
}