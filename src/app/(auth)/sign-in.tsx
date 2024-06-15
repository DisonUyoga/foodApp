import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SigninWithGoogle from "@/src/components/SigninWithGoogleOrMail";
import { Redirect, Stack } from "expo-router";
import { useAppSelector } from "@/src/utils/hooks";

const Signin = () => {
  const { session } = useAppSelector((state) => state.auth);
  if (session) {
    return <Redirect href={"/"} />;
  }
  return (
    <SafeAreaView className="flex-1 bg-primary items-center justify-center px-4">
      <Stack.Screen
        options={{
          title: "Sign in",
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTitleStyle: {
            color: "#ffff",
            fontWeight: "300",
          },
        }}
      />
      <SigninWithGoogle title="Sign in with google" />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Signin;
