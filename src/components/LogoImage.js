import React from 'react';
import styled from "styled-components/native";
import {Image, StyleSheet} from 'react-native';
import * as Styles from "@/styles";
import Colors from "@/styles/Colors";
import Images from "@/styles/Images";
import {widthPercentageToDP, heightPercentageToDP} from "react-native-responsive-screen";

function LogoImage() {
  return (
    <Image source={Images.logo.main} style={styles.logo} resizeMode={'cover'}/>
  )
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP('50%'),
    height: widthPercentageToDP('50%'),
}
});

export default LogoImage;
