import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { store } from "./features/store";
import { Provider } from "react-redux";
import { useColorScheme } from "@/src/components/useColorScheme";
import { LogBox } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { supabase } from "../lib/supabase";
import { useAppDispatch } from "../utils/hooks";
import {
  processingAuth,
  sessionToken,
  setAdmin,
} from "./features/slices/AuthSlice";
import QueryProvider from "../lib/QueryProvider";
import { StatusBar } from "expo-status-bar";
import { StripeProvider } from "@stripe/stripe-react-native";
import NotificationProvider from "../components/NotificationProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      store.dispatch(processingAuth({ authLoading: true }));
      const { data, error } = await supabase.auth.getSession();
      try {
        if (data.session?.access_token) {
          store.dispatch(sessionToken({ session: data.session }));
          const { data: profileData, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
          if (profileData?.group === "ADMIN") {
            store.dispatch(setAdmin({ isAdmin: true }));
          }
        } else {
          <Redirect href={"/sign-in"} />;
        }
      } catch (error) {
      } finally {
        store.dispatch(processingAuth({ authLoading: false }));
      }
    };
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      store.dispatch(sessionToken({ session: session }));
    });
  }, []);

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <QueryProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NotificationProvider>
              <StripeProvider
                publishableKey={
                  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
                }
              >
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <Stack
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: "#161622",
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        color: "#ffff",
                        fontWeight: "300",
                      },
                    }}
                  >
                    <Stack.Screen
                      name="user"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="admin"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="cart" />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                  </Stack>
                </ThemeProvider>
              </StripeProvider>
            </NotificationProvider>
          </GestureHandlerRootView>
        </QueryProvider>
      </RootSiblingParent>
      <StatusBar backgroundColor="#161622" style="light" />
    </Provider>
  );
}
