import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { TabBarIcon } from "../app/(tabs)/_layout";

interface ButtonProps {
  otherStyles?: string;
  ContainerStyles?: string;
  title: string;
  handlePress?: () => void;
}

const Button = ({
  otherStyles,
  ContainerStyles,
  title,
  handlePress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-lg ${ContainerStyles}`}
    >
      <View>
        {/* <TabBarIcon name="cart-plus" color="green" /> */}
        <Text className="text-center font-bold text-xl">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
