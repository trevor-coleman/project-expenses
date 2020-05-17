/// WONT MAKE IT INTO JS

export type HttpMethod = 'ALL' | 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
export type Role = "customer" | "user";
export type PaymentMethod = "e-transfer" | "cash" | "credit card" | "cheque" | "other";
export type TaxType = "income" | "hst"
export interface OrderItem {
    description: string;
    quantity: number;
    price: number;
    hst: number;
}

