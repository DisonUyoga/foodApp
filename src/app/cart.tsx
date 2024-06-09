import products from "@/assets/data/products";
import React, { useState } from "react";
import { FlatList, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import CartDetails from "../components/CartDetails";
import CartListItem from "../components/CartListItem";
import HeaderProducts from "../components/HeaderProducts";
import NoItemInCart from "../components/NoItemInCart";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [continueShopping, setContinueShopping] = useState(false);
  const dispatch = useAppDispatch();
  const { totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  if (!cartItems.length) {
    return <NoItemInCart />;
  }
  function shop() {
    setContinueShopping(!continueShopping);
  }
  return (
    <SafeAreaView className="flex-1 px-4 bg-primary">
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListHeaderComponent={() => (
            <View>
              <View className="bg-transparent">
                {continueShopping ? (
                  <Text className="text-white text-xl text-center font-bold">
                    Explore Our Menu
                  </Text>
                ) : (
                  <Text className="text-white text-xl text-center font-bold">
                    Cart
                  </Text>
                )}
                {continueShopping ? (
                  <HeaderProducts
                    textStyle="text-black-500"
                    products={products}
                    title="Explore Our Menu"
                  />
                ) : (
                  <Button
                    text="add more items to cart"
                    handlePress={shop}
                    otherStyles="bg-secondary p-2 rounded text-xs mt-4"
                  />
                )}
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View>
              <CartDetails
                quantity={totalQuantity}
                totalAmount={totalAmount}
                containerStyles="mt-4 bg-primary p-4 rounded"
                textStyles="font-bold text-gray-100"
              />

              <View className="flex-row items-center justify-between">
                <Button
                  text="Checkout"
                  className="items-center"
                  otherStyles="bg-green-500 p-2 rounded text-xs"
                />
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 10, gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default cart;
