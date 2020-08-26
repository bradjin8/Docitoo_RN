import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';

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
    marginVertical: 5 * scale,
  },
  textInput: {
    backgroundColor: '#6ac6ed',
    padding: 16 * scale,
    fontSize: 18 * scale,
    color: Colors.white2,
    borderRadius: 4 * scale,
  }
});

export default WhiteInput;
