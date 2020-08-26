import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, ImageBackground} from "react-native";
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';

const TransBlueButton = ({caption, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.caption}>
        {caption}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  caption: {
    color: Colors.blue2,
    textAlign: 'center',
    fontSize: 18 * scale,
  }
});

export default TransBlueButton;
