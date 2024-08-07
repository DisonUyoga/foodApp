import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { blurhash } from "@/assets/data/products";
import { useSupabaseImageDownLoad } from "../utils/useSupabaseImageDownLoad";

type RemoteImageProps = {
  path?: string;
  fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const image = useSupabaseImageDownLoad(path);

  if (!image) {
  }

  return (
    <Image
      style={styles.image}
      source={image || fallback}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
    />
  );
};

export default RemoteImage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderBlockColor: "#FF9C01",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    maxWidth: "50%",
    maxHeight: 250,
  },
  image: {
    width: 100,
    aspectRatio: 1,
  },
});
