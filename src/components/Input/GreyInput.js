import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';

const GreyInput = ({onChangeText, value, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 8,

  },
  textInput: {
    backgroundColor: Colors.grey_light,
    padding: 16 * scale,
    fontSize: 18 * scale,
  }
});

export default GreyInput;
