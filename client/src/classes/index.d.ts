/// WONT MAKE IT INTO JS
import { Currency, Options } from 'dinero.js';

export type HttpMethod = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export type Role = "customer" | "user";
export type PaymentMethod = "e-transfer" | "cash" | "credit card" | "cheque" | "other";
export type TaxType = "income" | "hst"
export type Money = Options | {amount: number; currency: Currency, precision?: number}
export interface OrderItem {
    description: string;
    quantity: number;
    price: Money;
    hst: Money;
}

import { Db, ObjectId } from 'mongodb';

export type DatabaseIdType = ObjectId | string | number
export type DatabaseType = Db;

