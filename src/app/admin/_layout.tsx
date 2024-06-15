import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/components/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { StatusBar } from "expo-status-bar";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF9C01",
          tabBarInactiveTintColor: "#161622",
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTitleStyle: {
            color: "#ffff",
            fontWeight: "300",
          },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="cutlery" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "Orders",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}