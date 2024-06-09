import { View, Text, Image } from "react-native";
import React from "react";
import { CartItems } from "../app/features/slices/cartSlice";
import styled from "styled-components/native";

const TextView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Table = ({ product }: { product: CartItems }) => {
  return (
    <TextView>
      <Image
        source={{ uri: product.image }}
        resizeMode="contain"
        className="w-12 h-12 aspect-square"
      />
      <Text className="text-gray-100 text-xs" numberOfLines={2}>
        {product.name}
      </Text>
      <Text className="text-gray-100 text-xs" numberOfLines={2}>
        {product.size}
      </Text>
      <Text className="text-gray-100 text-xs" numberOfLines={2}>
        {product.totalPrice}
      </Text>
    </TextView>
  );
};

export default Table;
