import { Invoice } from './invoice.entity';
export declare class Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    invoices: Invoice[];
}
