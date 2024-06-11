import { ImagePickerAsset } from "expo-image-picker";
import { FormikState } from "formik";
export type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
};

export type PizzaSize = "S" | "M" | "L" | "XL";

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

export type OrderStatus = "New" | "Cooking" | "Delivering" | "Delivered";

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};

interface CreateType {
  name: string | null;
  imageUrl: ImagePickerAsset | null | undefined;
  price: number | null;
}
interface ResetFormType {
  resetForm: (nextState?: Partial<FormikState<any>> | undefined) => void;
}
declare module "yup" {
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    append(appendStr: string): this;
  }
}
export interface UserType {
  username?: string;
  password: string;
  email?: string;
}
export interface ResetFormType {
  resetForm: (nextState?: Partial<FormikState<UserType>> | undefined) => void;
}
