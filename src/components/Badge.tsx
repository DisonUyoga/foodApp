import { View, Text } from "react-native";
import React from "react";
import { priceTag } from "../utils/priceTag";

interface BadgeProps {
  price?: number;
  otherStyles?: string;
}

const Badge = ({ price, otherStyles }: BadgeProps) => {
  return (
    <View>
      <Text
        className={`${
          otherStyles || "bg-secondary rounded"
        } max-w-[100px]  items-center justify-center text-center px-2`}
        numberOfLines={1}
      >
        {priceTag(price)}
      </Text>
    </View>
  );
};

export default Badge;
