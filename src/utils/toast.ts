import Toast from "react-native-root-toast";
export function toast() {
  Toast.show("Item added to cart", {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: "green",
    delay: 0,
  });
}
