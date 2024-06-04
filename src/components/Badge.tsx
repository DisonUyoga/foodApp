import { View, Text } from "react-native";
import React from "react";
import { priceTag } from "../utils/priceTag";

interface BadgeProps {
  price: number;
}

const Badge = ({ price }: BadgeProps) => {
  return (
    <View>
      <Text
        className="w-1/2 inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 justify-center"
        numberOfLines={1}
      >
        {priceTag(price)}
      </Text>
    </View>
  );
};

export default Badge;
