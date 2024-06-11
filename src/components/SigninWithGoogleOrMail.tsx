import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { ResetFormType, UserType } from "../type";
import { toast } from "../utils/toast";
import { userValidation } from "../utils/validation";
import FormElement from "./FormElement";
import ValidationError from "./ValidationError";

export interface SignInWithGoogleProps {
  title: string;

  type?: string;
}

const SigninWithGoogleOrMail = ({ title, type }: SignInWithGoogleProps) => {
  const [form, setForm] = useState<UserType>({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState<string[] | undefined>([]);

  return (
    <View className="w-full space-y-6 items-center">
      <Formik
        initialValues={form}
        onSubmit={async (value: UserType, { resetForm }: ResetFormType) => {
          setError([]);
          try {
            await userValidation.validate(value);
            resetForm({ values: { username: "", password: "", email: "" } });
            toast("Login successfull", "green");
          } catch (error: any) {
            error.errors.map((err: any) =>
              setError((prev: any) => {
                return [...prev, err];
              })
            );
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleBlur, values, handleSubmit }) => (
          <View className="item-center w-full">
            <FormElement
              label="Username"
              placeholder="username"
              value={values.username}
              handleChange={handleChange("username")}
              onBlur={handleBlur("username")}
            />
            {type === "signup" && (
              <FormElement
                label="Email"
                placeholder="email"
                value={values.email}
                onBlur={handleBlur("email")}
                handleChange={handleChange("email")}
              />
            )}
            <FormElement
              label="Password"
              placeholder="password"
              onBlur={handleBlur("password")}
              value={values.password}
              handleChange={handleChange("password")}
            />
            <View className="mt-7">
              <Button
                title="Submit"
                onPress={handleSubmit as any}
                color="#FF8E01"
              />
            </View>
          </View>
        )}
      </Formik>

      <View className="bg-transparent w-full border border-secondary rounded mb-2">
        <TouchableOpacity
          className="flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <FontAwesome name="google" size={25} color={"red"} />
          <Text className="text-center p-4 text-white">Login with google</Text>
        </TouchableOpacity>
      </View>
      {error?.length &&
        error.map((err, index) => <ValidationError key={index} error={err} />)}
      {type === "signup" ? (
        <View className="items-center mt-4">
          <Text>
            Have an account?
            <Link className="text-secondary" href="/sign-in">
              Sign in
            </Link>
          </Text>
        </View>
      ) : (
        <View className="items-center mt-4">
          <Text>
            Don't have an account?
            <Link className="text-secondary" href="/sign-up">
              Sign up
            </Link>
          </Text>
        </View>
      )}
    </View>
  );
};

export default SigninWithGoogleOrMail;
