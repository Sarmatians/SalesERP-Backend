import { Timestamp } from 'typeorm';
export declare class Tag {
    id: number;
    name: string;
    created: Timestamp;
    slug: string;
    parentTag: Tag;
    children: Tag[];
}
