import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import SigninWithGoogle from "@/src/components/SigninWithGoogleOrMail";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Signup = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary items-center justify-center px-4">
      <Stack.Screen
        options={{
          title: "Sign up",
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTitleStyle: {
            color: "#ffff",
            fontWeight: "300",
          },
        }}
      />
      <SigninWithGoogle title="Sign in with google" type="signup" />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Signup;
