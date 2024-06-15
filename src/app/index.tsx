import { Link, Redirect, Stack, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import Loading from "../components/Loading";
import { supabase } from "../lib/supabase";
import { useAppDispatch, useAppSelector } from "../utils/hooks";

const Root = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { session, authLoading, isAdmin } = useAppSelector(
    (state) => state.auth
  );
  if (authLoading) {
    return <Loading />;
  }
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }
  if (!isAdmin) {
    return <Redirect href={"/user/menu"} />;
  }
 
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

      <Link href={"/(auth)/sign-in"} asChild>
        <Button
          text="Sign out"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
          onPress={() => {
            supabase.auth.signOut();
          }}
        />
      </Link>
    </SafeAreaView>
  );
};

export default Root;
