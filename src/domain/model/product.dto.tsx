import { Category } from "@/domain/model/category";

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  image: string;
  category: Category;
}
