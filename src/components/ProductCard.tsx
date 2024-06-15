import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { OrderItem } from "../type";
import { Image } from "expo-image";
import Badge from "./Badge";
import * as Animatable from "react-native-animatable";
import { Link, useRouter, useSegments } from "expo-router";
import Button from "./Button";
import { addToCart } from "../app/features/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "../utils/toast";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import products from "@/assets/data/products";
import { StyleSheet } from "react-native";
import { blurhash } from "@/assets/data/products";
import { Tables } from "../database.types";
import RemoteImage from "./RemoteImage";

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
  product: Tables<"products">;
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
  function addProductToCart(product: Tables<"products">) {
    if (!product) return;
    dispatch(addToCart({ product, size }));

    toast("item added to cart", "green");

    // router.push("/cart");
  }

  return (
    <>
      {!animateItem ? (
        <Link href={`/${segments[0]}/menu/${product?.id}`} asChild>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.container}
            className="border border-secondary rounded"
          >
            <RemoteImage
              fallback={products[0].image}
              path={product.image as string}
            />

            <View className="bg-transparent w-full items-center justify-center">
              <Text className="text-white mb-4" numberOfLines={1}>
                {product?.name}
              </Text>
              <Badge price={product?.price} />
            </View>
          </TouchableOpacity>
        </Link>
      ) : (
        <Animatable.View
          className={`w-[150px]   space-y-2 p-2   rounded-lg ${containerStyle}`}
          animation={animateItem === product.id.toString() ? zoomIn : zoomOut}
          duration={10}
        >
          <View className="w-full bg-transparent items-center justify-center">
            <Image
              style={styles.image}
              source={product.image ?? products[0].image}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderBlockColor: "#FF9C01",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    maxWidth: "50%",
    maxHeight: 250,
  },
  image: {
    width: "80%",
    aspectRatio: 1,
  },
});
