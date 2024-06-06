import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/components/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";

const Root = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
    </Stack>
  );
};

export default Root;
