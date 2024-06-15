import { CartItems } from "../app/features/slices/cartSlice";
import {
  CreateType,
  InsertTables,
  OrderStatus,
  UpdateTables,
  UpdateType,
} from "../type";
import { useAppSelector } from "../utils/hooks";
import { supabase } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function createProduct(data: CreateType) {
  const { data: newProduct, error } = await supabase
    .from("products")
    .insert({
      name: data.name,
      price: data.price as number,
      image:
        data.image ??
        "https://cdn.pixabay.com/photo/2019/10/14/05/37/pizza-4547868_960_720.png",
    })
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return newProduct;
}
export async function updateProduct(data: UpdateType) {
  const { data: updatedProduct, error } = await supabase
    .from("products")
    .update({
      name: data.name,
      price: data.price as number,
      image: data.image,
    })
    .eq("id", parseInt(data.id))
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return updatedProduct;
}
export async function deleteProduct(productId: string) {
  const id = parseInt(productId);
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
}

export async function getOrders(id: string) {
  if (id) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
export async function getAdminOrders(archived = false) {
  const filter = archived ? ["DELIVERED"] : ["COOKING", "DELIVERING", "New"];

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .in("status", filter)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
export async function getOrder(id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("* , order_items(*, products(*))")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getOrderItem(id: string) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", id);
}
export async function createOrder(order: InsertTables<"orders">) {
  const { data: newProduct, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return newProduct;
}

export async function createOrderItem(
  items: InsertTables<"order_items">[],
  order_id: number
) {
  const { data, error } = await supabase.from("order_items").insert(
    items.map((item) => ({
      size: item.size,
      quantity: item.quantity,
      order_id: order_id,
      product_id: item.id,
    }))
  );
  if (error) {
    throw error;
  }
  return data;
}
export async function getOrderUpdate({
  updatedFields,
  id,
}: {
  updatedFields: UpdateTables<"orders">;
  id: string;
}) {
  const { data, error } = await supabase
    .from("orders")
    .update(updatedFields)
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }
  return data;
}
