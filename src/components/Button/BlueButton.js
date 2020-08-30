import React from 'react';
import {TouchableOpacity, ImageBackground, Text, Button, StyleSheet, View} from 'react-native';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';

const BlueButton = ({caption, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={Images.background.blue_button}
        style={styles.imageContainer}
        imageStyle={styles.image}
        resizeMode={'cover'}
      >
        <Text style={styles.caption}>
          {caption}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 20 * scale,
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    borderRadius: 5
  },
  caption: {
    color: '#fff',
    fontSize: 18 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 25 * scale,
  }
});

export default BlueButton;
