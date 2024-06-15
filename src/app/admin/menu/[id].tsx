import products, { blurhash } from "@/assets/data/products";
import Badge from "@/src/components/Badge";
import Loading from "@/src/components/Loading";
import RemoteImage from "@/src/components/RemoteImage";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useGetProduct } from "@/src/lib/query";
import { Tables } from "@/src/type";
import { useAppDispatch, useAppSelector } from "@/src/utils/hooks";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "../../../utils/toast";
import { addToCart, selectSize } from "../../features/slices/cartSlice";
const ProductDetail = () => {
  const { id, update } = useLocalSearchParams();

  const colorScheme = useColorScheme();

  const { data: product, error, isLoading } = useGetProduct(id as string);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    totalAmount,
    totalQuantity,
    sizes: selected,
  } = useAppSelector((state) => state.cart);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartItem = cartItems.find((p) => p.id === product?.id);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return;
  }
  const handleSelected = (size: string) => {
    if (!product) return;
    dispatch(selectSize({ size, product }));
    updateSize();
  };
  function updateSize() {
    if (update) {
      router.push("/cart");
    }
  }

  if (!product) return <Text>Oops product does not exists</Text>;
  function addProductToCart(product: Tables<"products">) {
    if (!product) return;
    dispatch(addToCart({ product, size: selected }));

    toast("item added to cart", "green");

    router.push("/cart");
  }

  return (
    <SafeAreaView className="bg-primary flex-1 px-4 space-y-6">
      <View className="bg-transparent w-full items-center space-y-6">
        <Stack.Screen
          options={{
            title: `${product.name}`,
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#161622",
            },
            headerTitleStyle: {
              color: "#ffff",
              fontWeight: "300",
            },

            headerRight: () => (
              <Link href={`/admin/menu/create/?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <View className="relative">
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={"#fff"}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    </View>
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />

        <RemoteImage
          fallback={products[0].image}
          path={product.image as string}
        />
        <View className="mt-7">
          <Badge price={product.price} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
