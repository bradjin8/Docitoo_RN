import React from 'react';
import {View, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '@/styles/Images';

const IconButton = ({name, size, color, style, backgroundImageStyle, iconStyle, onPress}) => {
  const backgroundStyle = style ? style : styles.background;
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={Images.background.blue_circle}
        style={backgroundStyle}
        imageStyle={styles.image}
        resizeMode={'contain'}
      >
        <Icon name={name} size={size} color={color} style={iconStyle}/>
      </ImageBackground>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 0
  },
  background: {

  }
});

export default IconButton;
