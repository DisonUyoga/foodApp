import icons from "@/constants/icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../../components/ProductCard";
import { supabase } from "../../../lib/supabase";

const Search = () => {
  const [search, setSearchValue] = useState<string | undefined>();
  const [searchData, setSearchData] = useState<any>([]);
  const [countValue, setCountValue] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        await handleSearch(search);
      }
    };
    fetchData();
  }, [search]);

  const handleSearch = async (query: string) => {
    if (!query) return;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .textSearch("name", query);

    setSearchData(data);
  };
  console.log(countValue);
  console.log(searchData);
  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-4">
      <View className="px-4 py-2 bg-gray-200 rounded-xl w-full flex-row items-center justify-between">
        <TextInput
          value={search}
          onChangeText={(e) => setSearchValue(e)}
          placeholderTextColor={"black"}
          placeholder="what are you looking for?"
          className=" text-grey-400 min-w-[200px]"
        />
        <TouchableOpacity onPress={() => handleSearch(search as string)}>
          <Image
            source={icons.search}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
      <View className="w-full mt-7">
        {searchData.length ? (
          <FlatList
            data={searchData}
            renderItem={({ item }) => <ProductCard product={item} />}
            contentContainerStyle={{ gap: 10 }}
          />
        ) : (
          <View className="flex-1">
            <Image
              source={icons.notfound}
              resizeMode="contain"
              className="w-full"
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;
