import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
const FILE_SIZE = 5 * 1024 * 1024;
export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "The name must contain atleast four characters")
    .defined("Name cannot be empty")
    .nullable("name cannot be empty")
    .required("Name is required"),
  imageUrl: Yup.mixed()
    .required("image is required")
    .test(
      "fileFormat",
      "Unsupported image format",
      (value: any) => value && SUPPORTED_FORMATS.includes(value.mimeType)
    )
    .test(
      "fileSize",
      "image is too large",
      (value: any) => value && value.fileSize <= FILE_SIZE
    ),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price cannot be empty")
    .positive("Price must be a positive number")
    .min(1, "The price must be atleast one"),
});

export const userValidation = Yup.object().shape({
  username: Yup.string()
    .required("username is required")
    .nonNullable("username cannot be null")
    .min(3, "username must contain atleast 4 letters"),

  email: Yup.string().email("Invalid Email").notRequired(),
  password: Yup.string()
    .required("password is required")
    .min(5, "password must contain atleast 5 characters")
    .matches(/[0-9]/, "Password must contain at least one number"),
});
