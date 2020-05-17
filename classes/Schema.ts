import { OrderItem, PaymentMethod, TaxType } from 'classes/';
import {DatabaseIdType} from 'database';

//Schemas define objects as represented in mongodb.

export interface Expense {
    _id: DatabaseIdType;
    userId: DatabaseIdType;
    projectId: DatabaseIdType;
    description: string;
    vendor: string;
    amount: number;
    hst: number;
}

export interface Project{
    _id: string | number | DatabaseIdType;
    userId: string;
    startDate: string | Date;
    endDate: string | Date;
    totalRevenue: number ;
    totalHSTCollected: number;
    totalHSTSpent: number ;
    totalExpenses: number ;
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
    subtotal: number;
    hst: number;
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
    amount: number;
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





// export type ProjectExpenseTrackerDatabase = {
//     projectExpenseTracker: {
//         people: {
//             _id: string,
//             name: "",
//             type: Role.Customer,
//         },
//         projects: {
//             project: {
//                 _id: "",
//                 projectName: "",
//                 deliveryDate: "",
//                 orders: {
//                     customer: {
//                         _id: "",
//                     },
//                     items: {
//                         item: {},
//                     },
//                     paid:true,
//                     paymentDate: new Date();
//                     paymentMethod:
//
//                 },
//                 expenses: {
//                     expense: {
//                         description: "",
//                         total: 0.00,
//                         hst: 0.00,
//                     },
//                 },
//             },
//         },
//         items: {},
//
//     },
// };
//
//
