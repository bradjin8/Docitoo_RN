import React from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableHighlight, Dimensions, Platform} from 'react-native';
import Container from '@/components/Container';
import styled from "styled-components/native";
import ImageButton from '@/components/Button/ImageButton';
import Images from '@/styles/Images';
import Colors from "@/styles/Colors";
import * as Styles from '@/styles'
import {scale, headerHeight} from '@/styles/Sizes';


const BoardWithHeaderRightButton = ({children, title, buttonCaption, onPressRightButton}) => {
  return (
    <Container style={styles.container}>
      <HeaderBg source={Images.background.header} resizeMode={'cover'}/>
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>
        <ImageButton onPress={onPressRightButton} image={Images.background.header_right_button}>
          <Text style={styles.caption}>
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? headerHeight / 5 : 0,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    height: headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightButton: {
    backgroundColor: Colors.blue2,
    paddingVertical: 5 * scale,
    paddingHorizontal: 20 * scale,
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
    height: Dimensions.get('window').height - headerHeight,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: '5%',
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

export default BoardWithHeaderRightButton;
