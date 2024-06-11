import { FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import orders from "@/assets/data/orders";
import { Order } from "@/src/type";
import OrderItem from "@/src/components/OrderItem";

export default function Orders() {
  return (
    <SafeAreaView className="bg-primary px-4 flex-1">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItem order={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
}
