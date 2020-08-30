import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Images from '@/styles/Images';

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <Image source={Images.background.splashBg} style={styles.background}/>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '120%'
  }
});

export default Loading;
