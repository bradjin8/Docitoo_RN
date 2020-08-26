import {View} from "react-native";
import React from "react";

const Separator = ({color}) => (
  <View
    style={{
      height: 0.5,
      width: '100%',
      backgroundColor: color,
    }}
  />
);

export default Separator;
