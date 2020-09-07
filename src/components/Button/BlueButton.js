import React from 'react';
import {TouchableOpacity, ImageBackground, Text, Button, StyleSheet, View} from 'react-native';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

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
    marginVertical: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    borderRadius: wp('1.5%')
  },
  caption: {
    color: '#fff',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    textAlign: 'center',
    margin: hp('3%'),
    textAlignVertical: 'center',
  }
});

export default BlueButton;
