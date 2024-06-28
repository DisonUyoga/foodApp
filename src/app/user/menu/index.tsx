import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import products from "@/assets/data/products";
import ProductCard from "@/components/ProductCard";
import icons from "@/constants/icons";
import Skeleton from "@/src/components/Skeleton";
import { Text, View } from "@/src/components/Themed";
import { useGetProducts } from "@/src/lib/query";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert } from "react-native";
import Animated, {
  FadeIn,
  BounceIn,
  ZoomInEasyDown,
  useSharedValue,
  BounceInLeft,
  BounceInDown,
  BounceOutUp,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
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
        <Animated.View entering={FadeIn} className="rounded-xl bg-primary">
          <ImageBackground
            source={icons.pizzaperk}
            resizeMode="cover"
            className="w-full h-48"
            imageStyle={styles.imageStyle}
          >
            <View className="bg-transparent absolute left-4 w-full py-4 space-y-4">
              <TouchableOpacity
                className="bg-white p-2 rounded-xl max-w-[250px] opacity-50 flex-row justify-between items-center"
                onPressIn={() => router.push("/user/menu/search")}
              >
                <Text className="font-semibold">What are you looking for?</Text>

                <Image
                  source={icons.search}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className="bg-transparent flex-row items-center w-full gap-x-[80px]">
                <Animated.Text
                  entering={BounceIn}
                  className="text-3xl text-white font-bold"
                >
                  PizzaPerk
                </Animated.Text>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => router.push("/location")}
                >
                  <Animated.Image
                    entering={BounceIn}
                    source={icons.location}
                    resizeMode="contain"
                    className="w-6 h-6"
                  />
                </TouchableOpacity>
              </View>
              <Animated.Text
                entering={ZoomInEasyDown.delay(50)}
                className="text-white  opacity-100 line-height-8"
              >
                "Discover PizzaPerk: Your Crave-Worthy Shortcut to Delicious
                Pizza Bliss!"
              </Animated.Text>
            </View>
          </ImageBackground>
        </Animated.View>
      )}

      <View className=" bg-primary  px-4  w-full relative">
        {headerVisible && (
          <Image
            source={icons.pizzaman}
            resizeMode="contain"
            className="w-16 h-16 absolute -top-6 rounded-full z-50"
          />
        )}
        <Animated.FlatList
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
            paddingBottom: 62,

            paddingTop: 30,
            borderRadius: 20,
          }}
          ItemSeparatorComponent={Separator}
          onScroll={toggleHeader}
          scrollEventThrottle={16}
        />
      </View>
      <StatusBar backgroundColor="transparent" style="light" />
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
