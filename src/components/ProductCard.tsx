import { View, Text } from "react-native";
import React from "react";
import { OrderItem, Product } from "../type";
import { Image } from "react-native";
import Badge from "./Badge";
import * as Animatable from "react-native-animatable";

const zoomIn: any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};
const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

interface ProductProps {
  product: Product;
  otherStyles?: string;
  containerStyle?: string;
  animateItem?: string;
}
const ProductCard = ({
  product,
  otherStyles,
  containerStyle,
  animateItem,
}: ProductProps) => {
  return (
    <>
      {!animateItem ? (
        <View className={`mt-7 space-y-2  py-4 rounded-lg ${containerStyle}`}>
          <View className="w-full bg-transparent items-center justify-center">
            <Image
              source={{ uri: product?.image }}
              resizeMode="contain"
              className={`aspect-square ${otherStyles}`}
            />
          </View>
          <View className="bg-transparent w-full items-center justify-center">
            <Text className="text-white mb-4" numberOfLines={1}>
              {product?.name}
            </Text>
            <Badge price={product?.price} />
          </View>
        </View>
      ) : (
        <Animatable.View
          className={`mt-7 space-y-2  py-4 rounded-lg ${containerStyle}`}
          animation={animateItem === product.id ? zoomIn : zoomOut}
        >
          <View className="w-full bg-transparent items-center justify-center">
            <Image
              source={{ uri: product?.image }}
              resizeMode="contain"
              className={`aspect-square ${otherStyles}`}
            />
          </View>
          <View className="bg-transparent w-full items-center justify-center">
            <Text className="text-white mb-4" numberOfLines={1}>
              {product?.name}
            </Text>
            <Badge price={product?.price} />
          </View>
        </Animatable.View>
      )}
    </>
  );
};

export default ProductCard;
