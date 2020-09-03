import React from 'react';
import styled from "styled-components/native";
import {Image, StyleSheet} from 'react-native';
import * as Styles from "@/styles";
import Colors from "@/styles/Colors";
import Images from "@/styles/Images";
import {windowWidth, windowHeight, scale} from "@/styles/Sizes";

function LogoImage() {
  return (
    <Image source={Images.logo.main} style={styles.logo} resizeMode={'contain'}/>
  )
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 2,
    height: windowWidth / 2,
}
});

export default LogoImage;
