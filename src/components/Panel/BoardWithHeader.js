import React from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet, Dimensions, Platform} from 'react-native';
import Container from '@/components/Container';
import styled from "styled-components/native";
import Images from '@/styles/Images';
import * as Styles from '@/styles'
import {scale, headerHeight} from '@/styles/Sizes';
import {widthPercentageToDP, heightPercentageToDP} from "react-native-responsive-screen";

const BoardWithHeader = ({children, title}) => {

  return (
    <Container style={styles.container}>
      <HeaderBg source={Images.background.header} resizeMode={'cover'}/>
      <Text style={styles.title}>
        {title}
      </Text>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios'?'padding':'height'} enabled={Platform.OS === 'ios'} style={styles.board} keyboardVerticalOffset={headerHeight}>
        {children}
      </KeyboardAvoidingView>
    </Container>
  )
};

const HeaderBg = styled.Image`
  ${Styles.absolute_top_full};
  zIndex: -10;
`;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: heightPercentageToDP('2.2%'),
    fontWeight: 'bold',
    position: 'absolute',
    top: Platform.OS === 'ios' ? headerHeight / 7 * 4 : headerHeight / 6,
    left: 0,
    right: 0,
    marginLeft: widthPercentageToDP('4%')
  },
  board: {
    position: 'absolute',
    top: headerHeight,
    left: 0,
    right: 0,
    width: '100%',
    height: Dimensions.get('window').height - headerHeight,
    backgroundColor: '#FFF',
    borderRadius: widthPercentageToDP('4%'),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: widthPercentageToDP('5%'),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BoardWithHeader;
