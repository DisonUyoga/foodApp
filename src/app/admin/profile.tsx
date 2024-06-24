import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { useAppSelector } from "@/src/utils/hooks";
import GrowingLoader from "@/src/components/GrowingLoader";
import { Link, Redirect, router } from "expo-router";

const ProfileScreen = () => {
  const { session, authLoading } = useAppSelector((state) => state.auth);
  if (authLoading) {
    return (
      <View className="bg-primary items-center justify-center flex-1">
        <GrowingLoader />
      </View>
    );
  }
  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <SafeAreaView className="bg-primary px-4 flex-1 space-y-6">
      <Text className="text-xs text-gray-100 ">{session?.user.email}</Text>

      <TouchableOpacity activeOpacity={0.7}>
        <Button
          text="Sign out"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
          onPress={() => {
            supabase.auth.signOut();
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Button
          text="go to user"
          otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
          onPress={() => {
            router.push("/user/menu?adminToUser=true");
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
