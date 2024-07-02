import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import products from "@/assets/data/products";
import ProductCard from "@/components/ProductCard";
import icons from "@/constants/icons";
import SearchComponent from "@/src/components/SearchComponent";
import Skeleton from "@/src/components/Skeleton";
import { Text, View } from "@/src/components/Themed";
import { useGetDelivery, useGetProducts } from "@/src/lib/query";
import { Link, Stack } from "expo-router";
import { Alert } from "react-native";
import Animated, {
  BounceIn,
  FadeIn,
  ZoomInEasyDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import FreeDelivery from "@/src/components/FreeDelivery";
import { useState } from "react";
const product = products[0];
const productOnOffer = products.slice(0, 5);

export default function TabOneScreen() {
  const { data, error, isLoading } = useGetProducts();

  const [visible, setVisible] = useState(false);

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    return Alert.alert("Fetch Error", error.message);
  }
  function toggleModal() {
    setVisible(!visible);
  }

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Stack.Screen options={{ headerShown: false }} />

      <Pressable className=" bg-primary  w-full">
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View className="px-2 bg-transparent">
              <ProductCard
                product={item}
                otherStyles="w-full"
                containerStyle={`border border-secondary items-center justify-center px-2 flex-1`}
              />
            </View>
          )}
          ListHeaderComponent={() => (
            <Animated.View
              entering={FadeIn}
              className="rounded-xl bg-primary relative"
            >
              <ImageBackground
                source={icons.admin}
                resizeMode="contain"
                className="w-full h-48"
                imageStyle={styles.imageStyle}
              >
                <View className="bg-transparent absolute left-4 w-full py-4 space-y-2">
                  <View className="bg-transparent">
                    <SearchComponent products={data as any} />
                  </View>

                  <Animated.Text
                    entering={BounceIn}
                    className="text-3xl text-white font-bold"
                  >
                    PizzaPerk Admin
                  </Animated.Text>

                  <Animated.Text
                    entering={ZoomInEasyDown.delay(50)}
                    className="text-white  opacity-100 line-height-8"
                  >
                    Your Ultimate App Management Solution
                  </Animated.Text>
                </View>
              </ImageBackground>
              <View className="flex-row items-center justify-between px-2 bg-transparent relative">
                <Link href={"/admin/menu/create"} asChild>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    className=" justify-center items-center"
                  >
                    <Image
                      source={icons.addItem}
                      resizeMode="contain"
                      className="w-10 h-10"
                    />
                    <Text className="text-gray-100 text-xs px-3">
                      Add Items
                    </Text>
                  </TouchableOpacity>
                </Link>
                <TouchableOpacity
                  activeOpacity={0.6}
                  className=" justify-center items-center"
                  onPress={() => toggleModal()}
                >
                  <Image
                    source={icons.delivery}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                  <Text
                    className="text-gray-100 text-xs px-3"
                    numberOfLines={2}
                  >
                    Free Delivery
                  </Text>
                </TouchableOpacity>
              </View>
              <FreeDelivery visible={visible} toggleModal={toggleModal} />
            </Animated.View>
          )}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 10,

            paddingTop: 30,
            borderRadius: 20,
          }}
          ItemSeparatorComponent={Separator}
        />
      </Pressable>
    </SafeAreaView>
  );
}

const Separator = () => {
  return <View className="border border-secondary-100"></View>;
};
const styles = StyleSheet.create({
  imageStyle: {
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    opacity: 0.4,
    borderTopRightRadius: 20,
    backgroundColor: "#161622",
  },
});
