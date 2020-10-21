import {View} from "react-native";
import React from "react";

const Separator = ({color, width = 1, percent = 100}) => (
  <View
    style={{
      height: 0.5 * width,
      width: `${percent}%`,
      backgroundColor: color,
      alignSelf: 'center'
    }}
  />
);

export default Separator;
