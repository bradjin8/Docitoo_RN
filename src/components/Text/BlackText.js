import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';


const BlackText = ({text}) => {
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
    fontSize: 20 * scale,
    color: Colors.black
  }
});

export default BlackText;
