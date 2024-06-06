import { Product } from "@/src/type";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

export interface CartItems {
  id: number;
  image: string | undefined;
  name: string;
  price: number;
  quantity: number;
}
export interface CartProps {
  cartItems: CartItems[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
} as CartProps;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartProps, action: PayloadAction<Product>) {
      const product = action.payload;
      // check if product is in the cart
      const item = state.cartItems.find((p) => p.id === product.id);
      if (!item) {
        state.cartItems.push({
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      } else {
        // if the product exists just increment the totalQuantity
        state.totalQuantity++;
      }

      state.totalAmount = state.cartItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
      );
    },
    deleteProduct(state: CartProps, action: PayloadAction<Product>) {
      const product = action.payload;
      // check if the product is in the cart
      const item = state.cartItems.find((p) => p.id === product.id);
      if (item) {
        state.cartItems = state.cartItems.filter((i) => i.id !== product.id);
      }
    },
  },
});

export const { addToCart, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
