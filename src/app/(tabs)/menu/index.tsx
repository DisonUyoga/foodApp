import { FlatList, Image, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../../../components/Badge";
import products from "@/assets/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/src/type";
import ProductsOnOffer from "@/src/components/ProductsOnOffer";
const product = products[0];
const productOnOffer = products.slice(0, 5);
console.log(product);

export default function TabOneScreen() {
  return (
    <SafeAreaView className="bg-primary flex-1 ">
      <View className="items-center justify-center bg-transparent">
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              otherStyles="w-1/2 h-[140px]"
              containerStyle={`border border-secondary items-center justify-center px-2 flex-1`}
            />
          )}
          ListHeaderComponent={() => (
            <>
              <View className="bg-transparent">
                <ProductsOnOffer products={products} />
              </View>
            </>
          )}
          numColumns={2}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}
