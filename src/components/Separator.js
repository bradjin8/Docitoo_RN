import {View} from "react-native";
import React from "react";

const Separator = ({color, width = 1}) => (
  <View
    style={{
      height: 0.5 * width,
      width: '100%',
      backgroundColor: color,
    }}
  />
);

export default Separator;
