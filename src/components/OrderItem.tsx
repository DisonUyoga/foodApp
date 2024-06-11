import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Order } from "../type";
import { formatDistanceToNow } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link, useSegments } from "expo-router";

interface OrderProps {
  order: Order;
}

const OrderItem = ({ order }: OrderProps) => {
  const segments = useSegments();
  console.log("llll", segments);
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row w-full item-center justify-between p-2 rounded bg-gray-100"
      >
        <View className="flex-col space-y-2">
          <Text className="font-bold text-sm">#{order.id}</Text>
          <Text className="text-xs font-semibold">
            {formatDistanceToNow(order.created_at, { addSuffix: true })}
          </Text>
        </View>
        <View className="flex-row gap-1 items-center">
          {order.status === "Delivered" ? (
            <FontAwesome name="check" size={10} color={"green"} />
          ) : (
            <FontAwesome6 name="pizza-slice" size={10} color="black" />
          )}
          <Text
            className={
              order.status === "Cooking"
                ? "text-orange-500"
                : order.status === "Delivered"
                ? "text-green-600"
                : "text-blue-600"
            }
          >
            {order.status}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default OrderItem;
