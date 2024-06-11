import { View, Text } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const Root = () => {
  return (
    <SafeAreaView className="flex-1 items-center bg-primary justify-center space-y-6">
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTitleStyle: {
            color: "#ffff",
            fontWeight: "300",
          },
        }}
      />
      <Link href={"/admin"} asChild>
        <Button
          text="Admin"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
        />
      </Link>
      <Link href={"/user"} asChild>
        <Button
          text="user"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
        />
      </Link>
      <Link href={"/(auth)/sign-up"} asChild>
        <Button
          text="sign up"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
        />
      </Link>
      <Link href={"/(auth)/sign-in"} asChild>
        <Button
          text="Sign in"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
        />
      </Link>
    </SafeAreaView>
  );
};

export default Root;
