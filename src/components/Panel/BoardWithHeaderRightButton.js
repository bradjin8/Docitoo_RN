import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableHighlight, Dimensions, Platform} from 'react-native';
import Container from '@/components/Container';
import styled from "styled-components/native";
import ImageButton from '@/components/Button/ImageButton';
import Images from '@/styles/Images';
import Colors from "@/styles/Colors";
import * as Styles from '@/styles'
import {scale, headerHeight} from '@/styles/Sizes';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";


const BoardWithHeaderRightButton = ({children, title, buttonCaption, onPressRightButton}) => {
  return (
    <Container style={styles.container}>
      <HeaderBg source={Images.background.header} resizeMode={'cover'}/>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>
        <ImageButton onPress={onPressRightButton} image={Images.background.header_right_button} style={styles.rightButton} imageStyle={styles.rightButtonImage}>
          <Text style={styles.rightButtonCaption}>
            {buttonCaption}
          </Text>
        </ImageButton>
      </View>
      <View style={styles.board} containerStyle={styles.boardContainer}>
        {children}
      </View>
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
    // backgroundColor: Colors.blue2,
    paddingVertical: hp('0.5%'),
    // paddingHorizontal: wp('5%'),
  },
  rightButtonImage: {
    height: Platform.OS === 'ios' ? headerHeight * 0.5: headerHeight * 0.8,
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

export default BoardWithHeaderRightButton;
