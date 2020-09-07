import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';
import {widthPercentageToDP, heightPercentageToDP} from "react-native-responsive-screen";


const BlackText = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: heightPercentageToDP('0.2%')
  },
  text: {
    textAlign: 'center',
    fontSize: heightPercentageToDP('2.2%'),
    color: Colors.black
  }
});

export default BlackText;
