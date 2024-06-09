import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Product } from "../type";
import ProductCard from "./ProductCard";
interface ProductsOnOfferProps {
  products: Product[];
  title: string;
  textStyle?: string;
}

const Trending = () => {};

const ProductsOnOffer = ({
  products,
  title,
  textStyle,
}: ProductsOnOfferProps) => {
  const [animateItemItem, setAnimateItem] = useState<any>();

  const viewableItemsChange = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setAnimateItem(viewableItems[0].key);
    }
  };

  return (
    <>
      <Text className={`${textStyle}`}>{title}</Text>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            otherStyles="w-24  p-4"
            containerStyle="ml-4 px-2 border border-gray-100"
            animateItem={animateItemItem}
          />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChange}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170, y: 0 }}
      />
    </>
  );
};

export default ProductsOnOffer;
