import React from 'react';
import {View, Text, KeyboardAvoidingView, StyleSheet, Dimensions, Platform} from 'react-native';
import Container from '@/components/Container';
import styled from "styled-components/native";
import Images from '@/styles/Images';
import Colors from "@/styles/Colors";
import * as Styles from '@/styles'
import {scale} from '@/styles/Sizes';


const BoardWithHeader = ({children, title}) => {
  return (
    <Container style={styles.container}>
      <HeaderBg source={Images.background.header} resizeMode={'cover'}/>
      <Text style={styles.title}>
        {title}
      </Text>
      <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios'} style={styles.board}>
        {children}
      </KeyboardAvoidingView>
    </Container>
  )
};

const headerHeight = Platform.OS === 'ios' ? 80 : 60;

const HeaderBg = styled.Image`
  ${Styles.absolute_top_full};
  zIndex: -10;
`;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: Platform.OS === 'ios' ? headerHeight / 2 : headerHeight / 3,
    left: 0,
    right: 0,
    marginLeft: 20
  },
  board: {
    position: 'absolute',
    top: headerHeight,
    left: 0,
    right: 0,
    width: '100%',
    height: Dimensions.get('window').height - headerHeight,
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BoardWithHeader;
