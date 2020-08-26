import React from 'react';
import {View} from 'react-native';

const Space = ({width, height, fill}) => {
  return (
    <View
      style={fill ? {flex: 1} : {width: width, height: height}}
      pointerEvents="none"
    />
  );
};

export default Space;
