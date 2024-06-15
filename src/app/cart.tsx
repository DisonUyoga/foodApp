import products from "@/assets/data/products";
import React, { useState } from "react";
import { FlatList, View, Text, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CartDetails from "../components/CartDetails";
import CartListItem from "../components/CartListItem";
import HeaderProducts from "../components/HeaderProducts";
import NoItemInCart from "../components/NoItemInCart";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { Stack, router } from "expo-router";
import { useCreateOrder, useCreateOrderItem } from "../lib/mutate";
import { toast } from "../utils/toast";
import { clearCart } from "./features/slices/cartSlice";
import OrderLoading from "../components/OrderLoading";
import { InsertTables } from "../type";

const cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [continueShopping, setContinueShopping] = useState(false);
  const { session } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { totalAmount, totalQuantity } = useAppSelector((state) => state.cart);
  const user_id = session?.user.id;
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { mutate: createOrderItem, isPending: orderItemPending } =
    useCreateOrderItem();

  if (!cartItems.length) {
    return <NoItemInCart />;
  }
  if (loading) {
    return <OrderLoading />;
  }

  function shop() {
    setContinueShopping(!continueShopping);
  }
  const handleCreateOrder = () => {
    setLoading(true);
    createOrder(
      { total: totalAmount, user_id },
      {
        onSuccess: (data) => {
          toast(
            "Your order is placed, please wait while we locate you with your order",
            "green"
          );
          // call handleOrderItems func to create order items
          handleOrderItems(data);
        },
      }
    );
    setLoading(false);
  };
  function handleOrderItems(data: InsertTables<"orders">) {
    setLoading(true);
    createOrderItem(
      { items: cartItems, order_id: data.id as number },
      {
        onSuccess: () => {
          // call handleOrderItems func to create order items
          dispatch(clearCart());
          setLoading(false);
          router.push(`/user/orders/${data.id}`);
        },
      }
    );
  }
  return (
    <SafeAreaView className="flex-1  bg-primary px-4">
      <Stack.Screen options={{ headerTintColor: "#fff" }} />
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListHeaderComponent={() => (
            <View>
              <View className="bg-transparent">
                {continueShopping && (
                  <Text className="text-white text-xl text-center font-bold">
                    Explore Our Menu
                  </Text>
                )}
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View>
              <CartDetails
                quantity={totalQuantity}
                totalAmount={totalAmount}
                containerStyles="mt-4 bg-primary p-4 rounded"
                textStyles="font-bold text-gray-100"
              />

              <View className="w-full  mb-4">
                <Button
                  title="Checkout"
                  color="green"
                  disabled={isPending}
                  onPress={() => handleCreateOrder()}
                />
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default cart;
