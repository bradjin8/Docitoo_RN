import React from 'react';
import {TextInput, View, StyleSheet, Platform} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';
import {widthPercentageToDP, heightPercentageToDP} from "react-native-responsive-screen";

const GreyInput = ({onChangeText, value, placeholder, numberOfLines, multiline, onFocus, secureTextEntry = false}) => {
  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: Colors.grey_light,
      paddingHorizontal: widthPercentageToDP('3.5%'),
      fontSize: heightPercentageToDP('2%'),
      marginVertical: heightPercentageToDP('0.5%'),
      textAlignVertical: multiline ? 'top' : 'center',
      height: multiline ? heightPercentageToDP('15%') : heightPercentageToDP('6%'),
    }
  });

  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      multiline={multiline === true}
      numberOfLines={numberOfLines}
      secureTextEntry={secureTextEntry}
    />
  );
};


export default GreyInput;
