// react-native-image-slider-box.d.ts

declare module "react-native-image-slider-box" {
  import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

  export interface SliderBoxProps {
    images: string[];
    sliderBoxHeight?: number;
    onCurrentImagePressed?: (index: number) => void;
    dotColor?: string;
    inactiveDotColor?: string;
    autoplay?: boolean;
    circleLoop?: boolean;
    dotStyle?: StyleProp<ViewStyle>;
    autoplayInterval?: number;
    parentWidth?: number;
  }

  export class SliderBox extends React.Component<SliderBoxProps> {}
}
