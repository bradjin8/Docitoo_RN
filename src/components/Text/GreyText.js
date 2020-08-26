import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';

const GreyText = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginVertical: 10 * scale
  },
  text: {
    textAlign: 'center',
    fontSize: 15 * scale,
    lineHeight: 30 * scale,
    color: Colors.grey_dark
  }
});

export default GreyText;
