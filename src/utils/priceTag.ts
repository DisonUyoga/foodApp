export function priceTag(price: number) {
  return price.toLocaleString("en-KE", {
    style: "currency",
    currency: "KSH",
  });
}
