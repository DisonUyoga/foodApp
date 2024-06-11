import { View, Text, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import { Order, OrderItem } from "@/src/type";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderDetails from "@/src/components/OrderDetails";
import OrderListItem from "@/src/components/OrderItem";

interface OrderDetailProps {
  orderItem: Order;
}
const OrderDetail = () => {
  const { orderId } = useLocalSearchParams()!;
  const order = orders.find((item) => item.id.toString() === orderId);
  console.log(order);
  if (!order)
    return <Text className="text-gray-100 text-center">Item not found</Text>;
  return (
    <SafeAreaView className="bg-primary px-4 flex-1">
      <Stack.Screen options={{ title: `#${orderId}` }} />
      <View className="mb-2">
        <Text className="text-white mb-2">Order Item</Text>
        <OrderListItem order={order} />
      </View>
      <FlatList
        data={order?.order_items}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <OrderDetails order={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
};

export default OrderDetail;
