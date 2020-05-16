import { Currency, Money } from 'ts-money';
import { IProject, IProjectData, IProjectParams } from './AProject';

export type Role = "customer" | "user";
export type PaymentMethod = "e-transfer" | "cash" | "credit card" | "cheque" | "other";
export type _MongoID = string;
export type TaxType = "income" | "hst"

export interface IExpense {
    _id: _MongoID;
    user: _MongoID;
    project: _MongoID;
    description: string;
    vendor: string;
    amount: number;
    hst: number;
}




export interface IOrderItem {
    description: string;
    quantity: number;
    price: number;
    hst: number;
}

export interface IOrder {
    _id: _MongoID;
    customer: _MongoID;
    vendor: _MongoID;
    project: _MongoID;
    items: IOrderItem[];
    paid: boolean;
    paymentMethod: PaymentMethod | null;
    subtotal: number;
    hst: number;
}

export interface IPerson {
    _id: _MongoID;
    name: string;
    email: string;
    customerOf: _MongoID[];
}

export interface IUser {
    projects: _MongoID[];
}

export interface ITransfer {
    date: string;
    taxType: TaxType;
    amount: number;
}

export interface DatabaseSchema {
    people: IPerson[]
    projects: IProjectData[];
    expenses: IExpense[];
    orders: IOrder[];
    transfers: ITransfer[];


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
