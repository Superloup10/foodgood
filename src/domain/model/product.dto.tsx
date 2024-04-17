import {Category} from "@prisma/client";
import {Buy} from "./buy.dto";

export interface Product {
    id: number;
    name: string;
    price: number;
    amount: number;
    image: string;
    category: Category;
    buy?: Buy[];
}
