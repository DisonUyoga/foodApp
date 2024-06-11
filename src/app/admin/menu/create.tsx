import icons from "@/constants/icons";
import FormElement from "@/src/components/FormElement";
import ValidationError from "@/src/components/ValidationError";
import { CreateType, ResetFormType } from "@/src/type";
import { toast } from "@/src/utils/toast";
import { validationSchema } from "@/src/utils/validation";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const Create = () => {
  const [form, setForm] = useState<CreateType>({
    name: null,
    price: 0,
    imageUrl: null,
  });

  const { id } = useLocalSearchParams();
  const [error, setError] = useState<any>([]);
  const isUpdating = !!id;
  const openPicker = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      setForm({ ...form, imageUrl: res.assets[0] });
    }
  };
  const onSubmit = async (values: CreateType) => {
    if (isUpdating) {
      update();
    }
    handleSubmit();
  };
  const handleSubmit = async () => {
    let validationError;
    // field validation
    setError([]);
    try {
      console.log(form);
      await validationSchema.validate(form);

      toast("product added successfully", "green");
    } catch (error: any) {
      error.errors.map((err: string) =>
        setError((prev: string[]) => {
          return [...prev, err];
        })
      );
      console.log(error);
    } finally {
      console.log("something happened");
      setForm({
        name: "",
        price: 0,
        imageUrl: null,
      });
    }
  };
  function update() {
    console.log("updating");
  }

  const handleDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const onDelete = () => {
    console.log("item deleted");
  };
  const Button = styled.Button`
    background-color: yellow;
    width: "100%";
    border-radius: 5px;
    padding: 10px;
    font-size: 0.9rem;
  `;
  console.log(isUpdating);
  return (
    <SafeAreaView className="bg-primary flex-1 items-center justify-center px-4">
      <Stack.Screen
        options={{
          title: isUpdating ? "Update Product" : "Create Product",
          headerStyle: {
            backgroundColor: "#161622",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#ffff",
            fontWeight: "300",
          },
        }}
      />
      <ScrollView>
        <View className="w-full items-center">
          <FormElement
            label="Name"
            placeholder="name..."
            value={form.name}
            handleChange={(e) => setForm({ ...form, name: e })}
          />
          <FormElement
            label="Price"
            placeholder="price..."
            value={form.price}
            handleChange={(e) => setForm({ ...form, price: parseInt(e) })}
            keyboardType="numeric"
          />

          {form.imageUrl && (
            <View className="w-full items-center mt-4">
              <Image
                source={{ uri: form.imageUrl.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() => openPicker()}
            className="w-full mt-4 rounded"
          >
            <View className="w-full h-40 px-4 bg-black-100 roudned-2xl justify-center items-center space-y-2">
              <Text className="text-white">Upload Product Image</Text>
              <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-1/2 h-1/2"
                />
              </View>
              {form.imageUrl?.fileName && (
                <Text className="text-white text-xs">
                  {form.imageUrl?.fileName}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <View className="w-full mt-4 mb-4">
            <Button
              title={isUpdating ? "Update" : "Create"}
              onPress={handleSubmit as any}
              color={"#FF8E01"}
            />
          </View>
          {isUpdating && (
            <Text
              className=" bg-red-500 mt-4 text-white p-2 w-full text-center rounded"
              onPress={handleDelete}
            >
              Delete
            </Text>
          )}
          <View className="mt-4">
            {error.length > 0 &&
              error.map((err: string, index: number) => (
                <ValidationError key={index} error={err} />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
