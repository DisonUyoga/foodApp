import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";

import { SafeAreaView } from "react-native-safe-area-context";
import OrderDetails from "@/src/components/OrderDetails";
import OrderListItem from "@/src/components/OrderItem";
import Status from "@/src/components/Status";
import { Order, OrderStatus } from "@/src/type";

interface OrderDetailProps {
  orderItem: Order;
}
export const OrderStatusList: OrderStatus[] = [
  "New",
  "Cooking",
  "Delivering",
  "Delivered",
];

const OrderDetail = () => {
  const { orderId } = useLocalSearchParams()!;

  const order = orders.find((item) => item.id.toString() === orderId);
  const [selected, setSelected] = useState<OrderStatus | undefined>(
    order?.status
  );

  if (!order)
    return <Text className="text-gray-100 text-center">Item not found</Text>;
  const handleSelected = (status: OrderStatus) => {
    setSelected(status);
  };
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
        ListFooterComponent={() => (
          <ScrollView horizontal className="mt-2">
            <Text className="text-gray-100 mt-2">status</Text>
            <View className="flex-row">
              {OrderStatusList.map((s) => (
                <Status
                  key={s}
                  status={s}
                  handleSelected={handleSelected}
                  selected={selected}
                />
              ))}
            </View>
          </ScrollView>
        )}
      />
    </SafeAreaView>
  );
};

export default OrderDetail;
