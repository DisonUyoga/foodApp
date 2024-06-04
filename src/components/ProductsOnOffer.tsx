import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Product } from "../type";
import ProductCard from "./ProductCard";
interface ProductsOnOfferProps {
  products: Product[];
}

const Trending = () => {};

const ProductsOnOffer = ({ products }: ProductsOnOfferProps) => {
  const [animateItemItem, setAnimateItem] = useState<any>();

  const viewableItemsChange = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setAnimateItem(viewableItems[0].key);
      console.log(viewableItems[0].key);
    }
  };
  console.log(animateItemItem);
  return (
    <>
      <Text className="text-gray-100 text-base text-center font-bold">
        Products on Offer
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            otherStyles="w-24 h-24 p-4"
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
