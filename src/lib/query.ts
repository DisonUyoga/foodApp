import { useQuery } from "@tanstack/react-query";
import {
  getAdminOrders,
  getOrder,
  getOrderItem,
  getOrders,
  getProduct,
  getProducts,
} from "./api";

export function useGetProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  return { data, isLoading, error };
}

export function useGetProduct(id: string | undefined) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id as string),
  });

  return { data, isLoading, error };
}

export function useOrders(id: string) {
  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: () => getOrders(id),
  });
}

export function useAdminOrders(archived = false) {
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: () => getAdminOrders(archived),
  });
}

export function useOrderDetails(id: string) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
}
// export function useOrderItem(id: string) {
//   return useQuery({
//     queryKey: ["order_item", { order_id: id }],
//     queryFn: () => getOrderItem(id),
//   });
// }
