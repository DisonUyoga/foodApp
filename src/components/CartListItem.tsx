import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "./constants/Colors";
// import { CartItem } from "../types";
import { Link, useSegments } from "expo-router";
// import { defaultPizzaImage } from "../../../constants/Images";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {
  CartItems,
  increaseQuantity,
  decreaseQuantity,
} from "../app/features/slices/cartSlice";
import { priceTag } from "../utils/priceTag";
interface CartListItemProps {
  cartItem: CartItems;
}
const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const segments = useSegments();
  console.log(segments);

  return (
    <Pressable style={styles.container}>
      <Image
        source={{ uri: cartItem.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>{priceTag(cartItem.price)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View className="flex-col items-center">
        <View style={styles.quantitySelector}>
          <TouchableOpacity activeOpacity={0.7}>
            <FontAwesome
              onPress={() => dispatch(decreaseQuantity(cartItem))}
              name="minus"
              color="gray"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>

          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <FontAwesome
              onPress={() => dispatch(increaseQuantity(cartItem))}
              name="plus"
              color="gray"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mt-4" activeOpacity={0.7}>
          <Link
            style={{ color: Colors.light.tint }}
            className="text-xs"
            href={`/user/menu/${cartItem.id}?update=${true}`}
          >
            Update Size
          </Link>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    paddingVertical: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default CartListItem;
