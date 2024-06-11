import { View, Text, Image } from "react-native";
import React from "react";
import { OrderItem } from "../type";
import products from "@/assets/data/products";
import { priceTag } from "../utils/priceTag";

interface OrderDetailsProps {
  order: OrderItem;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const product = products.find((item) => item.id === order.product_id);
  console.log("this is the product", product);
  return (
    <View className="flex-1 item-center p-2 rounded bg-secondary justify-between space-y-2 flex-row">
      <Image
        source={{ uri: order.products.image }}
        resizeMode="contain"
        className="w-24 h-16 "
      />

      <Text className="font-bold text-white">
        {priceTag(order.products.price)}
      </Text>
      <View className="items-center justify-between px-2">
        <Text className=" font-semibold text-sm">Size: {order?.size}</Text>
        <Text className=" font-semibold text-sm">
          Quantity: {order?.quantity}
        </Text>
      </View>
    </View>
  );
};

export default OrderDetails;
