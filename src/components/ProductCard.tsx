import { View, Text, Pressable } from "react-native";
import React, { memo } from "react";
import { OrderItem, Product } from "../type";
import { Image } from "react-native";
import Badge from "./Badge";
import * as Animatable from "react-native-animatable";
import { Link, useRouter, useSegments } from "expo-router";
import Button from "./Button";
import { addToCart } from "../app/features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "../utils/toast";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

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
  const dispatch = useAppDispatch();
  const { sizes: size } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const segments = useSegments();
  function addProductToCart(product: Product) {
    if (!product) return;
    dispatch(addToCart({ product, size }));

    toast();

    // router.push("/cart");
  }
  console.log(segments);
  return (
    <>
      {!animateItem ? (
        <Link href={`/${segments[0]}/menu/${product?.id}`} asChild>
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
          className={`w-48 space-y-2  py-4 rounded-lg ${containerStyle}`}
          animation={animateItem === product.id.toString() ? zoomIn : zoomOut}
          duration={10}
        >
          <View className="w-full bg-transparent items-center justify-center">
            <Image
              source={{ uri: product?.image }}
              resizeMode="contain"
              className={` aspect-square ${otherStyles}`}
            />
          </View>
          <View className="bg-transparent w-full items-center justify-center">
            <Text className="text-white mb-4" numberOfLines={1}>
              {product?.name}
            </Text>
            <Badge price={product?.price} />
            <Button
              text="Add to cart"
              onPress={() => addProductToCart(product)}
              otherStyles="bg-secondary mt-2 px-2 rounded text-xs py-2"
            />
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

export default memo(ProductCard);
