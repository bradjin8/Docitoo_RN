import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native';
import Container from '@/components/Container';
import styled from "styled-components/native";
import Images from '@/styles/Images';
import Colors from "@/styles/Colors";
import * as Styles from '@/styles'
import {scale, headerHeight} from '@/styles/Sizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import GestureRecognizer from 'react-native-swipe-gestures';
import Icon from "react-native-vector-icons/Fontisto";


const BoardWithHeaderBackButton = ({children, title, buttonCaption, onPressButton, onSwipeUp}) => {
  const handleSwipeUp = (state) => {
    console.log('SwipeUp', state);
    if (onSwipeUp)
      onSwipeUp();
  };

  return (
    <GestureRecognizer
      onSwipeUp={(state) => handleSwipeUp(state)}
    >
      <Container style={styles.container}>
        <HeaderBg source={Images.background.header} resizeMode={'cover'}/>
        <View style={styles.header}>
          <TouchableOpacity onPress={onPressButton} style={styles.rightButton}>
            <Icon name={'angle-left'} color={'#fff'} size={hp('2%')}/>
            <Text style={styles.rightButtonCaption}>
              {' '}
              {buttonCaption}
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        <View style={styles.board} containerStyle={styles.boardContainer}>
          {children}
        </View>
      </Container>
    </GestureRecognizer>
  )
};

const HeaderBg = styled.Image`
  ${Styles.absolute_top_full};
  zIndex: -10;
`;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? headerHeight / 5 : 0,
    left: 0,
    right: 0,
    marginHorizontal: wp('4%'),
    height: headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightButton: {
    width: wp('40%'),
    height: headerHeight / 3,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightButtonCaption: {
    fontSize: 18 * scale,
    color: Colors.white2
  },
  board: {
    position: 'absolute',
    top: headerHeight,
    left: 0,
    right: 0,
    width: '100%',
    height: hp('100%'),
    backgroundColor: '#FFF',
    borderRadius: wp('4%'),
    padding: wp('5%'),
  },
  boardContainer: {
    flex: 1,
    height: hp('100%'),
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BoardWithHeaderBackButton;
