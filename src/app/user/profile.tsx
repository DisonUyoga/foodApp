import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { useAppSelector } from "@/src/utils/hooks";
import { router } from "expo-router";

const ProfileScreen = () => {
  const { session, isAdmin } = useAppSelector((state) => state.auth);
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
      {isAdmin && (
        <TouchableOpacity activeOpacity={0.7}>
          <Button
            text="go to admin"
            otherStyles="w-full bg-secondary text-gray-100 text-center items-center justify-center py-4 rounded"
            onPress={() => {
              router.push("/admin/menu?userToAdmin=true");
            }}
          />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
