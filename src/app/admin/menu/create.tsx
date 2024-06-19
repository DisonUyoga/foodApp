import icons from "@/constants/icons";
import DeletingLoader from "@/src/components/DeletingLoader";
import FormElement from "@/src/components/FormElement";
import Loading from "@/src/components/Loading";
import UpLoading from "@/src/components/Uploading";
import ValidationError from "@/src/components/ValidationError";
import {
  useCreateProduct,
  useDelete,
  useUpdateProduct,
} from "@/src/lib/mutate";
import { useGetProduct } from "@/src/lib/query";
import { uploadImage } from "@/src/lib/uploadImage";
// import { CreateType } from "@/src/type";
import { useAppSelector } from "@/src/utils/hooks";
import { toast } from "@/src/utils/toast";
import { validationSchema } from "@/src/utils/validation";
import * as ImagePicker from "expo-image-picker";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset>();
  const { id } = useLocalSearchParams();
  const { globalErrors } = useAppSelector((state) => state.error);
  const [error, setError] = useState<any>([...globalErrors]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const isUpdating = !!id;
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDelete();
  const {
    data: updatingProduct,
    isLoading,
    error: updateError,
  } = useGetProduct(id as string);

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price);
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);
  if (loading) {
    return (
      <View className="bg-primary flex-1 items-center justify-center">
        <UpLoading />
      </View>
    );
  }
  if (deleteLoading) {
    return (
      <View className=" flex-1 items-center justify-center">
        <DeletingLoader />
      </View>
    );
  }
  if (isLoading) {
    return <Loading />;
  }

  const openPicker = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!res.canceled) {
        setImage(res.assets[0].uri);

        setFile(res.assets[0]);
      }
    } catch (error: any) {
      Alert.alert("Error", error);
    }
  };
  const onSubmit = async () => {
    if (isUpdating) {
      return update();
    }
    return handleSubmit();
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError([]);
    try {
      await validationSchema.validate({
        name,
        price: price,
        image,
      });
      const imagePath = (await uploadImage(file, image as string)) as
        | string
        | null;
      
      createProduct(
        { name, price, image: imagePath },
        {
          onSuccess: () => {
            resetFields();
            setLoading(false);
            router.push(`/admin/menu`);
          },
        }
      );
    } catch (error: any) {
      error.errors.map((err: string) =>
        setError((prev: string[]) => {
          return [...prev, err];
        })
      );
    } finally {
      setLoading(false);
    }
  };
  async function update() {
    setLoading(true);
    const imagePath = (await uploadImage(file, image as string)) as
      | string
      | null;
    try {
      if (!id) return;
      updateProduct(
        { id: id as string, name, image: imagePath, price },
        {
          onSuccess: () => {
            resetFields();
            setLoading(false);
            toast("product updated successfully", "green");
            router.back();
          },
        }
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
    setDeleteLoading(true);
    if (!id) return;
    deleteProduct(id as string, {
      onSuccess: () => {
        resetFields();
        setDeleteLoading(false);
        toast("product deleted successfully", "green");
        router.replace("/admin/menu");
      },
    });
  };
  const Button = styled.Button`
    background-color: yellow;
    width: "100%";
    border-radius: 5px;
    padding: 10px;
    font-size: 0.9rem;
  `;
  function resetFields() {
    setName("");
    setPrice(null);
    setImage(null);
    setFile(undefined);
  }

 
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
            value={name}
            handleChange={(e) => setName(e)}
          />
          <FormElement
            label="Price"
            placeholder="price..."
            value={isUpdating ? price?.toString() : price}
            handleChange={(e) => setPrice(e as unknown as number)}
            keyboardType="numeric"
          />

          {image && (
            <View className="w-full items-center mt-4">
              <Image
                source={{ uri: image }}
                resizeMode="contain"
                className="w-full h-64"
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
              {file?.fileName && (
                <Text className="text-white text-xs">{file.fileName}</Text>
              )}
            </View>
          </TouchableOpacity>
          <View className="w-full mt-4 mb-4">
            <Button
              title={isUpdating ? "Update" : "Create"}
              onPress={onSubmit as any}
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
