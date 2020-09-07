import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Colors from '@/styles/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const WhiteInput = ({onChangeText, value, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={'#eee'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: hp('0.5%'),
  },
  textInput: {
    backgroundColor: '#6ac6ed',
    padding: hp('1.6%'),
    fontSize: hp('1.8%'),
    color: Colors.white2,
    borderRadius: wp('1.5%'),
  }
});

export default WhiteInput;
