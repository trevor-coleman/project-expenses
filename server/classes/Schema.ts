import { DatabaseIdType, Money, OrderItem, PaymentMethod, TaxType } from './';


//Schemas define objects as represented in mongodb.

export interface Expense {
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    projectId: DatabaseIdType;
    description: string;
    vendor: string;
    amount: Money;
    hst: Money;
}

export interface Project{
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    name: string;
    startDate: string | Date;
    endDate: string | Date;
    totalRevenue: Money ;
    totalHSTCollected: Money;
    totalHSTSpent: Money ;
    totalExpenses: Money ;
    incomeTaxRate: number;
    numberOfOrders: number;
}

export interface Order {
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    customerId: DatabaseIdType;
    vendor: string;
    projectId: DatabaseIdType;
    items: OrderItem[];
    paid: boolean;
    paymentMethod: PaymentMethod | null;
    subtotal: Money;
    hst: Money;
}

export interface Person {
    _id: DatabaseIdType;
    name: string;
    email: string;
    customerOf: DatabaseIdType[];
}

export interface User {
    projects: DatabaseIdType[];
}

export interface Transfer {
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    date: string;
    taxType: TaxType;
    amount: Money;
    fromAccount: string;
    toAccount: string;
}

export interface Database {
    people: Person[]
    projects: Project[];
    expenses: Expense[];
    orders: Order[];
    transfers: Transfer[];
}


