import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import Colors from '@/styles/Colors';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import __ from '@/assets/lang';
import Space from '@/components/Space';
import {DoctorCard} from '@/components/List/DoctorList';
import Separator from "@/components/Separator";
import ImageSlider from './components/ImageSlider';
import ScrollBoardWithHeaderLBButton from "@/components/Panel/ScrollBoardWithHeaderLRButton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import MapView, {Marker} from 'react-native-maps';
import Images from "@/styles/Images";
import StarRatingBar from "react-native-star-rating-view";
import GreyInput from "@/components/Input/GreyInput";
import * as datetime from "node-datetime";
import Loading from "@/components/Loading";

const ViewDoctor = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      {vm.doctor && !vm.isLoading ?
        <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('share')}
                                       onPressLeftButton={vm.onPressBack}
                                       onPressRightButton={vm.onPressShare}>
          <DoctorCard doctor={vm.doctor}/>
          <Space height={hp('0.5%')}/>
          <Separator color={Colors.grey}/>

          {!vm.isReviewMode && <View>
            {vm.doctor.hospital ?
              <View>
                <View style={styles.locationContainer}>
                  <MapView
                    style={styles.locationPicker}
                    initialRegion={{
                      latitude: 37.78825,
                      longitude: -112.4324,
                      latitudeDelta: 1.0,
                      longitudeDelta: 1.0,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: 37.78825,
                        longitude: -112.4324,
                      }}
                    />
                  </MapView>
                  <View style={styles.locationTextContainer}>
                    <Text style={styles.boldLabel}>
                      {(vm.doctor.hospital && vm.doctor.hospital.name) || ''}
                    </Text>
                    <Text style={styles.locationText}>
                      {(vm.doctor.hospital && vm.doctor.hospital.location) || ''}
                    </Text>
                  </View>
                </View>
                <Separator color={Colors.grey}/>
                <Space height={hp('1.6%')}/>
                <Text style={styles.boldLabel}>
                  {__('description')}
                </Text>
                <Space height={hp('1%')}/>
                <Text style={styles.description}>
                  {(vm.doctor.hospital && vm.doctor.hospital.description) || ''}
                </Text>
                <ImageSlider images={(vm.doctor.hospital && vm.doctor.hospital.images) || []}/>
              </View> :
              <View>
                <Space height={hp('1%')}/>
                <Text style={styles.description}>
                  {__('no_hospital')}
                </Text>
                <Space height={hp('1%')}/>
              </View>
            }

            <Separator color={Colors.grey}/>
            <Space height={hp('1%')}/>
            <Text style={styles.boldLabel}>
              {__('reviews')}
            </Text>
            {vm.doctor.reviews.length > 0 ?
              vm.doctor.reviews.map((review, index) => <ReviewCard review={review} key={index}/>)
              :
              <View>
                <Space height={hp('1%')}/>
                <Text style={styles.description}>
                  {__('no_review')}
                </Text>
                <Space height={hp('1%')}/>
              </View>
            }
            <Space height={hp('25%')}/>
          </View>}
          {vm.isReviewMode &&
          <View>
            <Space height={hp('2%')}/>
            <View style={{flexDirection: 'row', justifyContent: 'center', width: wp('90%')}}>
              <Text style={{...styles.boldLabel, marginRight: hp('10%')}}>
                {__('rating')}:
              </Text>
              <StarRatingBar
                readOnly={false}
                score={vm.rating}
                accurateHalfStars={false}
                continuous={true}
                starStyle={styles.starImage}
                emptyStarImage={<Image style={styles.starImage} source={Images.star.empty}/>}
                filledStarImage={<Image style={styles.starImage} source={Images.star.filled}/>}
                scoreTextStyle={styles.starBar}
                onStarValueChanged={(val) => vm.setRating(val)}
              />
            </View>
            <Space height={hp('2%')}/>
            <Text style={styles.boldLabel}>
              {__('description')}
            </Text>
            <GreyInput placeholder={__('description')} value={vm.description}
                       onChangeText={vm.setDescription} numberOfLines={8} multiline
              // onFocus={(event) => {
              //   vm.scrollToInput(ReactNative.findNodeHandle(event.target))
              // }}
            />
          </View>}
        </ScrollBoardWithHeaderLBButton>
        :
        <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('share')}
                                       onPressLeftButton={vm.onPressBack}
                                       onPressRightButton={vm.onPressShare}>
          <Loading/>
        </ScrollBoardWithHeaderLBButton>

      }

      <View style={{
        backgroundColor: Colors.white2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: hp('10%'),
        margin: 0,
        elevation: 10,
        shadowColor: Colors.grey_dark,
        shadowRadius: hp('10%'),
        shadowOpacity: 0.75,
      }}>
        {!vm.isReviewMode ?
          (<View style={{
            marginHorizontal: wp('5%'),
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('1%')
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
          </View>) :
          (<View style={{
            marginHorizontal: wp('5%'),
            width: wp('90%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp('1%')
          }}>
            <TouchableHighlight style={styles.whiteButton} onPress={vm.onSubmitReview} underlayColor={Colors.blue1}>
              <Text style={styles.whiteButtonLabel}>
                {__('submit')}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.blueButton} onPress={vm.onPressCancel}
                                underlayColor={Colors.white2}>
              <Text style={styles.blueButtonLabel}>
                {__('cancel')}
              </Text>
            </TouchableHighlight>
          </View>)}
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
  const {createdAt, author} = review;

  return (
    <View style={styles.authorContainer}>
      <Image style={styles.authorAvatar} source={{uri: author.avatarUrl}}/>
      <View style={styles.locationTextContainer}>
        <Text style={styles.boldLabel}>{author.fullName}</Text>
        <Text style={styles.authorReviewDate}>{datetime.create(createdAt).format('f Y')}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  boldLabel: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginVertical: hp('1%')
  },
  locationText: {
    fontSize: hp('1.6%'),
    marginVertical: hp('0.6%'),
  },
  description: {
    fontSize: hp('2%'),
    lineHeight: hp('3%'),
  },
  locationContainer: {
    marginVertical: hp('2%'),
    flexDirection: 'row',
  },
  locationPicker: {
    width: hp('9%'),
    height: hp('9%'),
    borderRadius: hp('4.5%'),
    backgroundColor: Colors.grey_dark
  },
  locationTextContainer: {
    marginLeft: wp('5%'),
    flexDirection: 'column',
    alignContent: 'center',
  },
  whiteButtonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: wp('42%'),
    borderRadius: wp('0.5%'),
    borderWidth: 0.5,
    borderColor: Colors.blue1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueButtonLabel: {
    color: Colors.white2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  blueButton: {
    backgroundColor: Colors.blue1,
    width: wp('46%'),
    padding: hp('2%'),
    borderRadius: wp('0.5%'),
    borderWidth: 0.5,
    borderColor: Colors.blue2,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContainer: {
    // backgroundColor: '#111',
    marginVertical: hp('1.2%'),
  },
  authorContainer: {
    flexDirection: 'row',
    paddingVertical: hp('0.5%'),
  },
  authorAvatar: {
    width: hp('8%'),
    height: hp('8%'),
    borderRadius: hp('4%'),
  },
  authorReviewDate: {
    color: Colors.grey_dark,
  },
  starBar: {
    color: 'transparent',
    // height: 30,
  },
  starImage: {
    width: hp('2.5%'),
    height: hp('2.5%'),
  },
  ratingCount: {
    fontSize: hp('1.8%'),
    // position: 'absolute',
    // right: 0,
  },

});

export default observer(ViewDoctor);
