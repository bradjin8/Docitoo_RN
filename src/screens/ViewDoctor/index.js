import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, Button, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';
import * as StringUtil from '@/utils/String';
import DoctorList, {DoctorCard} from '@/components/List/DoctorList';
import Separator from "@/components/Separator";
import ImageSlider from './components/ImageSlider';
import ScrollBoardWithHeaderLBButton from "@/components/Panel/ScrollBoardWithHeaderLRButton";

const ViewDoctor = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      {vm.doctor &&
      <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('share')}
                                     onPressLeftButton={vm.onPressBack}
                                     onPressRightButton={vm.onPressShare}>
        <DoctorCard doctor={vm.doctor}/>
        <Space height={5 * scale}/>
        <Separator color={Colors.grey}/>
        <View style={styles.locationContainer}>
          <View style={styles.locationPicker}>
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.boldLabel}>
              {vm.doctor.hospital.name}
            </Text>
            <Text style={styles.locationText}>
              {vm.doctor.hospital.location}
            </Text>
          </View>
        </View>
        <Separator color={Colors.grey}/>
        <Space height={16 * scale}/>
        <Text style={styles.boldLabel}>
          {__('description')}
        </Text>
        <Space height={10 * scale}/>
        <Text style={styles.description}>
          {vm.doctor.hospital.description}
        </Text>
        <ImageSlider images={vm.doctor.hospital.images}/>
        <Separator color={Colors.grey}/>
        <Space height={10 * scale}/>
        <Text style={styles.boldLabel}>
          {__('reviews')}
        </Text>
        {vm.doctor.reviews.map((review) => <ReviewCard review={review}/>)}
        <Space height={200 * scale}/>
      </ScrollBoardWithHeaderLBButton>}
      <View style={{
        backgroundColor: Colors.white2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '10%',
        margin: 0,
        elevation: 10,
        shadowColor: Colors.grey_dark,
        shadowRadius: 10,
        shadowOpacity: 0.75,
      }}>
        <View style={{
          marginHorizontal: '5%', width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%'
        }}>
          <TouchableHighlight style={styles.whiteButton} onPress={vm.onPressWriteReview} underlayColor={Colors.blue1}>
            <Text style={styles.whiteButtonLabel}>
              {__('write_review')}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.blueButton} onPress={vm.onPressBook} underlayColor={Colors.white2}>
            <Text style={styles.blueButtonLabel}>
              {__('book')}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Container>
  )
};

export const ReviewCard = ({review}) => {
  return (
    <View style={styles.reviewContainer}>
      <AuthorCard review={review}/>
      <Text style={styles.description}>
        {review.description}
      </Text>
    </View>
  )
};

export const AuthorCard = ({review}) => {
  const {date, author} = review;

  return (
    <View style={styles.authorContainer}>
      <Image style={styles.authorAvatar} source={{uri: author.avatarUrl}}/>
      <View style={styles.locationTextContainer}>
        <Text style={styles.boldLabel}>{author.fullName}</Text>
        <Text style={styles.authorReviewDate}>{date}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  boldLabel: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    marginVertical: 10 * scale
  },
  locationText: {
    fontSize: 14 * scale,
    marginVertical: 6 * scale,
  },
  description: {
    fontSize: 18 * scale,
    lineHeight: 30 * scale,
  },
  locationContainer: {
    marginVertical: 20 * scale,
    flexDirection: 'row',
  },
  locationPicker: {
    width: 80 * scale,
    height: 80 * scale,
    borderRadius: 40 * scale,
    backgroundColor: Colors.grey_dark
  },
  locationTextContainer: {
    marginLeft: 20 * scale,
    flexDirection: 'column',
    alignContent: 'center',
  },
  whiteButtonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18 * scale,
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 18,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.blue1,
    alignContent: 'center',
  },
  blueButtonLabel: {
    color: Colors.white2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 18 * scale,
  },
  blueButton: {
    backgroundColor: Colors.blue1,
    width: '48%',
    padding: 18 * scale,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.blue2,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContainer: {
    // backgroundColor: '#111',
    marginVertical: 10 * scale,
  },
  authorContainer: {
    flexDirection: 'row',
    paddingVertical: 10 * scale,
  },
  authorAvatar: {
    width: 76 * scale,
    height: 76 * scale,
    borderRadius: 38 * scale,
  },
  authorReviewDate: {
    color: Colors.grey_dark,
  }
});

export default observer(ViewDoctor);