import Toast from "react-native-root-toast";
export function toast(text: string, bgColor: string) {
  Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP +60,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: bgColor,
    delay: 0,
    
  });
}
