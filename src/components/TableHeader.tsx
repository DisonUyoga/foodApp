import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

const TableHeader = ({ head }: { head: string }) => {
  return (
    <View>
      <Text className="text-gray-100 uppercase text-xs">{head}</Text>
    </View>
  );
};

export default TableHeader;
