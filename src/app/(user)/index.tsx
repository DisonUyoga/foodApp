import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const Page = () => {
  return <Redirect href={"/(user)/menu/"} />;
};

export default Page;
