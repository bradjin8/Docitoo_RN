import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Images from '@/styles/Images';
import LinearGradient from 'react-native-linear-gradient';

const Loading = (props) => {
  return (
    <LinearGradient colors={['#00e4ee', '#2082fe']} style={styles.container}>
      <Image source={Images.logo.main} style={styles.logo} resizeMode={'contain'}/>
    </LinearGradient>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: '#111',
  },
  logo: {
    width: Dimensions.get('window').width / 1.5,
  }
});

export default Loading;
