import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "@/components/constants/Colors";
import { forwardRef } from "react";

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<View | null, ButtonProps | any>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        ref={ref}
        {...pressableProps}
        style={styles.container}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF9C01",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default Button;
