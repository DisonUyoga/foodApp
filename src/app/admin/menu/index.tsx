import { FlatList, Image, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../../../components/Badge";
import products from "@/assets/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/src/type";
import ProductsOnOffer from "@/src/components/HeaderProducts";
import { Stack } from "expo-router";
const product = products[0];
const productOnOffer = products.slice(0, 5);

export default function TabOneScreen() {
  return (
    <SafeAreaView className="bg-primary flex-1 ">
     
      <View className="items-center justify-center bg-transparent">
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              otherStyles="w-full"
              containerStyle={`border border-secondary items-center justify-center px-2 flex-1`}
            />
          )}
          ListHeaderComponent={() => (
            <View className="bg-transparent space-y-6">
              <Text className="text-2xl text-white text-center font-bold">
                Welcome to Pizza Paradise!
              </Text>
              <View className="bg-transparent">
                <ProductsOnOffer
                  textStyle="text-gray-100 font-bold text-center text-xl"
                  products={products}
                  title="Special Deals Just for You!!!"
                />
              </View>
              <Text className="text-white text-center">
                Pizza Galore: Find Your Favorite
              </Text>
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}
