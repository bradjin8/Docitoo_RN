import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const ImageButton = ({child, image, imageStyle, onPress, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Image
        source={image}
        style={imageStyle}
        resizeMode={'contain'}
      >
        {child}
      </Image>
    </TouchableOpacity>
  );
};

export default ImageButton;
