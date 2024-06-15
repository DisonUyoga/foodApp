import { Alert, FlatList } from "react-native";

import products from "@/assets/data/products";
import ProductCard from "@/components/ProductCard";
import ProductsOnOffer from "@/src/components/HeaderProducts";
import Loading from "@/src/components/Loading";
import { Text, View } from "@/src/components/Themed";
import { useGetProducts } from "@/src/lib/query";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import UpLoading from "@/src/components/Uploading";
const product = products[0];
const productOnOffer = products.slice(0, 5);

export default function TabOneScreen() {
  const { data, error, isLoading } = useGetProducts();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return Alert.alert("Fetch Error", error.message);
  }
  return (
    <SafeAreaView className="bg-primary flex-1 px-4">
      <View className="bg-transparent">
        <FlatList
          data={data}
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

              <Text className="text-white text-center">
                Pizza Galore: Find Your Favorite
              </Text>
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{ gap: 10, paddingBottom: 30 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}
