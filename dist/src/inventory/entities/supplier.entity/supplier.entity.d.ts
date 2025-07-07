import { Item } from '../item.entity/item.entity';
export declare class Supplier {
    id: number;
    name: string;
    email: string;
    phone: string;
    emergency_contact: string;
    address: string;
    Type: string;
    remarks: string;
    account_balance: number;
    totalAmount?: number;
    dueAmount?: number;
    paidAmount?: number;
    points: string;
    Special_Date_Type: string;
    special_dates: Date;
    is_active: boolean;
    is_wholesale: boolean;
    data: any;
    items: Item[];
}
