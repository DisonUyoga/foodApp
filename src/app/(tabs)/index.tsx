import { FlatList, Image, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from "../../components/Badge";
import products from "@/assets/data/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/src/type";
import ProductsOnOffer from "@/src/components/ProductsOnOffer";
const product = products[0];
const productOnOffer = products.slice(0, 5);
console.log(product);

export default function TabOneScreen() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            otherStyles="w-48 h-48"
            containerStyle="border border-secondary"
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="bg-transparent">
              <ProductsOnOffer products={products} />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}
