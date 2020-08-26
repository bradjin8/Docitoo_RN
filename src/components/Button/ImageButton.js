import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const ImageButton = ({child, image, onPress, style}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Image
        source={image}
        style={styles.image}
        resizeMode={'cover'}
      >
        {child}
      </Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {}
});

export default ImageButton;
