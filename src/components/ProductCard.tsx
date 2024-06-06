import { View, Text, Pressable } from "react-native";
import React from "react";
import { OrderItem, Product } from "../type";
import { Image } from "react-native";
import Badge from "./Badge";
import * as Animatable from "react-native-animatable";
import { Link } from "expo-router";

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
  console.log("jjj", animateItem);
  return (
    <>
      {!animateItem ? (
        <Link href={`/menu/${product?.id}`} asChild>
          <Pressable
            className={` space-y-2  py-4 rounded-lg ${containerStyle}`}
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
          </Pressable>
        </Link>
      ) : (
        <Animatable.View
          className={`mt-7 space-y-2  py-4 rounded-lg ${containerStyle}`}
          animation={animateItem === product.id.toString() ? zoomIn : zoomOut}
          duration={10}
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
            <Link
              className="text-gray-100"
              href={`/menu/${product?.id}`}
              asChild
            >
              view
            </Link>
          </View>
        </Animatable.View>
      )}
    </>
  );
};

export default ProductCard;
