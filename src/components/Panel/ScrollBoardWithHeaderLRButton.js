import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native';
import Container from '@/components/Container';
import styled from "styled-components/native";
import Images from '@/styles/Images';
import Colors from "@/styles/Colors";
import * as Styles from '@/styles'
import {scale, headerHeight} from '@/styles/Sizes';
import Icon from "react-native-vector-icons/Fontisto";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";


const ScrollBoardWithHeaderLBButton = ({children, lButtonCaption, rButtonCaption, onPressLeftButton, onPressRightButton}) => {
  return (
    <Container style={styles.container}>
      <HeaderBg source={Images.background.header} resizeMode={'cover'}/>
      <View style={styles.header}>
        <TouchableOpacity style={styles.lButton} onPress={onPressLeftButton}>
          <Icon name={'angle-left'} color={'#fff'} size={hp('2%')}/>
          <Text style={styles.title}>
            {lButtonCaption}
          </Text>
        </TouchableOpacity>
        {rButtonCaption && rButtonCaption.length &&
        <TouchableOpacity style={styles.rButton} onPress={onPressRightButton}>
          <Icon name={'share-a'} color={'#fff'} size={hp('1.6%')}/>
          <Text style={styles.rButtonCaption}>
            {rButtonCaption}
          </Text>
        </TouchableOpacity>}
      </View>
      <ScrollView style={styles.board} containerStyle={styles.boardContainer}>
        {children}
      </ScrollView>
    </Container>
  )
};

const HeaderBg = styled.Image`
  ${Styles.absolute_top_full};
  zIndex: -10;
`;

const styles = StyleSheet.create({
  lButton: {
    width: wp('40%'),
    height: headerHeight / 3,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  rButton: {
    width: hp('10%'),
    // height: headerHeight / 3,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6ac6ed',
    // opacity: 0.1,
    borderRadius: wp('1%')
  },
  rButtonCaption: {
    fontSize: hp('1.8%'),
    color: Colors.white2
  },
  title: {
    color: '#fff',
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    marginLeft: hp('1%'),
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? headerHeight / 5 : 0,
    left: 0,
    right: 0,
    marginHorizontal: wp('3%'),
    height: headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  board: {
    position: 'absolute',
    top: headerHeight,
    left: 0,
    right: 0,
    width: '100%',
    height: Dimensions.get('window').height - headerHeight,
    backgroundColor: '#FFF',
    borderRadius: wp('4%'),
    padding: wp('5%'),
  },
  boardContainer: {
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

export default ScrollBoardWithHeaderLBButton;
