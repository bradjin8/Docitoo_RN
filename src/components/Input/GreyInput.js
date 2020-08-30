import React from 'react';
import {TextInput, View, StyleSheet, Platform} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';

const GreyInput = ({onChangeText, value, placeholder, numberOfLines, multiline}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={{textAlignVertical: multiline ? 'top': 'center', ...{height: multiline ? 100 : 50}, ...styles.textInput}}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8 * scale,
  },
  textInput: {
    backgroundColor: Colors.grey_light,
    padding: 16 * scale,
    fontSize: 18 * scale,
  }
});

export default GreyInput;
