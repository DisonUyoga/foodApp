import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "@/src/components/Badge";
import CartButton from "@/src/components/CartButton";
import SelectSize from "@/src/components/SelectSize";
import Button from "@/src/components/Button";
import { addToCart, deleteProduct } from "../../features/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/utils/hooks";

const sizes = ["S", "M", "XL", "L"];
const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);
  const [selected, setSelected] = useState("M");
  const dispatch = useAppDispatch();
  const { totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  const handleSelected = (size: string) => {
    setSelected(size);
  };

  console.log(selected);
  if (!product) return <Text>Oops product does not exists</Text>;
  function addToCart() {}

  return (
    <SafeAreaView className="bg-primary flex-1 px-4 space-y-6">
      <View className="bg-transparent w-full">
        <Stack.Screen
          options={{
            title: `${product.name}`,
          }}
        />
        <Image
          source={{ uri: product.image }}
          resizeMode="contain"
          className="w-full aspect-square"
        />
        <View className="flex-row w-full bg-transparent items-start justify-between mt-7">
          {sizes.map((item) => (
            <SelectSize
              key={item}
              sizes={item}
              handleSelected={handleSelected}
              selected={selected}
            />
          ))}
        </View>

        <View className="mt-2 flex-row items-center justify-between">
          <Badge price={totalAmount} />
          <Badge price={totalQuantity} />
          <Badge price={product.price} />
        </View>

        <Button text="Add to Cart" onPress={addToCart} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
