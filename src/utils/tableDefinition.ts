import { TableColumn } from "react-data-table-component";
import { CartItems } from "../app/features/slices/cartSlice";

export const columns: TableColumn<CartItems>[] = [
  {
    name: "Image",
    selector: (row) => row.image,
  },
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Image",
    selector: (row) => row.image,
  },
  {
    name: "Price",
    selector: (row) => row.price,
  },
  {
    name: "qty",
    selector: (row) => row.quantity,
  },
  {
    name: "Total",
    selector: (row) => row.totalPrice,
  },
  {
    name: "Size",
    selector: (row) => row.size,
  },
];
