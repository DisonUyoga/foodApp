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
        className="bg-secondary max-w-[100px] rounded items-center justify-center text-center px-2 mt-4"
        numberOfLines={1}
      >
        {priceTag(price)}
      </Text>
    </View>
  );
};

export default Badge;
