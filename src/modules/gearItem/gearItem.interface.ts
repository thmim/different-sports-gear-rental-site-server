import { ProductCondition } from "../../../generated/prisma/enums"

export interface IGearItems {
    name: string;
    product_image?: string;
    description: string;
    brand: string;
    category_id:string;
    is_available?: boolean;
    condition?: ProductCondition;
    daily_price: number;
    quantity: number;
}

export interface IUpdateItems{
    name?: string;
    product_image?: string;
    description?: string;
    brand?: string;
    is_available?: boolean;
    condition?: ProductCondition;
    daily_price?: number;
    quantity?: number;
}