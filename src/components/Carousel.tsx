import React from "react";
import { View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?tree",
    "https://source.unsplash.com/1024x768/?mountain",
  ];

  return (
    <View style={{ flex: 1 }}>
      <SliderBox
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={(index) => console.log(`image ${index} pressed`)}
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;
