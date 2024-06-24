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
import Loading from "@/src/components/Loading";
import { Text, View } from "@/src/components/Themed";
import { useGetProducts } from "@/src/lib/query";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Skeleton from "@/src/components/Skeleton";
import { useState } from "react";
import Animated, {
  useSharedValue,
  FadeIn,
  BounceIn,
  BounceOutUp,
  ZoomInEasyDown,
} from "react-native-reanimated";
const product = products[0];
const productOnOffer = products.slice(0, 5);

export default function TabOneScreen() {
  const { data, error, isLoading } = useGetProducts();
  const [headerVisible, setHeaderVisible] = useState(true);

  const scrollY = useSharedValue(0);
  const HEADER_HEIGHT = 60;
  const toggleHeader = (event: {
    nativeEvent: { contentOffset: { y: any } };
  }) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > HEADER_HEIGHT && headerVisible) {
      setHeaderVisible(false);
    } else if (scrollPosition <= HEADER_HEIGHT && !headerVisible) {
      setHeaderVisible(true);
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }
  if (error) {
    return Alert.alert("Fetch Error", error.message);
  }
  return (
    <SafeAreaView className="bg-primary flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      {headerVisible && (
        <Animated.View
          entering={FadeIn}
          exiting={BounceOutUp}
          className="rounded-xl bg-primary"
        >
          <ImageBackground
            source={icons.admin}
            resizeMode="contain"
            className="w-full h-48"
            imageStyle={styles.imageStyle}
          >
            <View className="bg-transparent absolute left-4 w-full py-4 space-y-2">
              <TouchableOpacity
                className="bg-white p-2 rounded-xl max-w-[250px] opacity-50 flex-row justify-between items-center"
                onPressIn={() => router.push("/admin/menu/search")}
              >
                <Text className="font-semibold">What are you looking for?</Text>

                <Image
                  source={icons.search}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>

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
                Your Ultimate Pizza Management Solution
              </Animated.Text>
            </View>
          </ImageBackground>
        </Animated.View>
      )}
      <Pressable className=" bg-primary  px-4  w-full relative">
        {headerVisible && (
          <Link href={"/admin/menu/create"} asChild>
            <TouchableOpacity
              activeOpacity={0.6}
              className="space-y-4 justify-center"
            >
              <Image
                source={icons.addItem}
                resizeMode="contain"
                className="w-16 h-16 absolute -top-12 rounded-full z-50"
              />
              <Text className="text-gray-100 text-xs">Add Items</Text>
            </TouchableOpacity>
          </Link>
        )}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              otherStyles="w-full"
              containerStyle={`border border-secondary items-center justify-center px-2 flex-1`}
            />
          )}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 60,

            marginTop: 30,
            borderRadius: 20,
          }}
          ItemSeparatorComponent={Separator}
          onScroll={toggleHeader}
          scrollEventThrottle={16}
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
