import products from "@/assets/data/products";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SkeletonCardPlaceholder from "./SkeletonCardPlaceholder";

const Skeleton = ({ item }: any) => {
  const [data, setData] = useState(item || products);

  return (
    <View style={styles.container}>
      {data.map((product: any) => (
        <SkeletonCardPlaceholder key={product.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
});

export default Skeleton;
