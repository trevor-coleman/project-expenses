import { Money, Currencies, Currency } from 'ts-money';
import requiredParam from '../server/helpers/required-param';
import mongodb from 'mongodb';

export interface IProjectParams{
    _id?: string | number | mongodb.ObjectId;
    owner: string;
    startDate: string | Date;
    endDate: string | Date;
    totalRevenue: number | Money;
    totalHSTCollected: number | Money;
    totalHSTSpent: number | Money;
    totalExpenses: number | Money;
    incomeTaxRate: number;
    numberOfOrders: number;
}

export interface IProjectData extends IProjectParams{
    _id?: string;
    owner: string;
    startDate: string;
    endDate: string;
    totalRevenue: number;
    totalHSTCollected: number;
    totalHSTSpent: number;
    totalExpenses: number;
    incomeTaxRate: number;
    numberOfOrders: number;
}


export interface IProject{
    _id: string;
    owner: string;
    startDate: Date;
    endDate: Date;
    totalRevenue: Money;
    totalHSTCollected: Money;
    totalHSTSpent: Money;
    totalExpenses: Money;
    incomeTaxRate: number;
    numberOfOrders: number;
}


export abstract class AProject implements IProject {
    _id: string;
    owner: string;
    startDate: Date;
    endDate: Date;
    totalRevenue: Money;
    totalHSTCollected: Money;
    totalHSTSpent: Money;
    totalExpenses: Money;
    incomeTaxRate: number;
    numberOfOrders: number;

    constructor({
                    _id = "", owner, startDate, endDate,
                    totalRevenue, totalHSTCollected, totalHSTSpent,
                    totalExpenses, incomeTaxRate, numberOfOrders,
                }: IProjectData)
    {
        this._id = _id ;
        this.owner = owner;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.totalRevenue = new Money(totalRevenue, Currencies.CAD);
        this.totalHSTCollected = new Money(totalHSTCollected, Currencies.CAD);
        this.totalHSTSpent = new Money(totalHSTSpent, Currencies.CAD);
        this.totalExpenses = new Money(totalExpenses, Currencies.CAD);
        this.incomeTaxRate = incomeTaxRate;
        this.numberOfOrders = numberOfOrders;
    }
}

export default class Project extends AProject {};