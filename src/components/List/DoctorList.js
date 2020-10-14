import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, SectionList, TouchableOpacity, FlatList, Text} from 'react-native';
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';
import * as StringUtil from '@/utils/String';
import __ from '@/assets/lang';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import Images from '@/styles/Images';
import Separator from '@/components/Separator';
import Space from '@/components/Space';
import {formatHour} from '@/utils/String';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import BoardWithHeaderRightButton from "../../screens/Doctors";

const DoctorList = ({doctors, onPressDoctor}) => {
  return (
    <DoctorListView doctors={doctors} onPressDoctor={onPressDoctor}/>
  );
};

const DoctorListView = ({doctors, onPressDoctor}) => {
  return (
    <View style={{paddingBottom: hp('10%')}}>
      <FlatList
        style={{marginBottom: hp('5%')}}
        data={doctors}
        renderItem={({item}) => <DoctorRow
          onPressDoctor={onPressDoctor}
          doctor={item}
          key={item.id}
        />}
        ItemSeparatorComponent={() => <Separator color={'#f3f3f3'}/>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
};

export const DoctorRow = ({doctor, onPressDoctor}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPressDoctor(doctor)}>
      <Image source={{uri: doctor.avatarUrl}} style={styles.avatar}/>
      <View style={styles.containerText}>
        <Text style={styles.name}>
          Dr. {doctor.fullName}
        </Text>
        <Text style={styles.speciality}>
          {__(doctor.speciality)}
        </Text>
        <DoctorReview style={styles.reviews} reviews={doctor.reviews}/>
        <Text style={styles.address}>
          {doctor.street + ', ' + doctor.city + ', ' + doctor.country}
        </Text>
      </View>
    </TouchableOpacity>
  )
};

export const DoctorCard = ({doctor}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: doctor.avatarUrl}} style={styles.avatar}/>
      <View style={styles.containerText}>
        <Text style={styles.name}>
          Dr. {doctor.fullName}
        </Text>
        <Text style={styles.specialityCard}>
          {__(doctor.speciality)}
        </Text>
        <Text style={styles.availableTime}>
          {(doctor.availableTime && (formatHour(doctor.availableTime.from) + ' - ' + formatHour(doctor.availableTime.to))) || '-'}
        </Text>
        <DoctorReview style={styles.reviewsCard} reviews={doctor.reviews}/>
      </View>
    </View>
  )
};

const DoctorReview = ({reviews}) => {
  const [averageRating, setAverageRating] = useState(0.0);

  useEffect(() => {
    let totalRating = 0.0;
    reviews.map(item => {
      totalRating += parseFloat(item.rating);
    });
    // console.log('DoctorList', 'TotalRating', totalRating);
    setAverageRating(totalRating / reviews.length);
  }, [averageRating]);
  // On Component did mount
  useEffect(() => {
  }, []);

  return (
    <View style={styles.reviews}>
      <StarRatingBar
        readOnly={true}
        score={averageRating}
        dontShowSocre={false}
        allowHalfStars={true}
        accurateHalfStars={true}
        continuous={true}
        starStyle={styles.starImage}
        emptyStarImage={<Image style={styles.starImage} source={Images.star.empty}/>}
        filledStarImage={<Image style={styles.starImage} source={Images.star.filled}/>}
        scoreTextStyle={styles.starBar}
      />
      <Text style={styles.ratingCount}>
        {StringUtil.formatInteger(reviews.length) + ' ' + __('ratings')}
      </Text>
    </View>
  );
};

const rowHeight = hp('14%');
const textLineHeight = rowHeight / 5;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
  },
  avatar: {
    width: rowHeight,
    height: rowHeight,
    borderRadius: wp('1.5%'),
  },
  containerText: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: hp('2%'),
    // height: rowHeight,
    alignItems: 'stretch',
    width: '100%'
  },
  name: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    // height: textLineHeight
  },
  speciality: {
    fontSize: hp('2%'),
    // height: textLineHeight,
    color: Colors.grey_dark,
  },
  specialityCard: {
    fontSize: hp('2.2%'),
    marginVertical: hp('0.5%'),
    // height: textLineHeight,
    color: Colors.black,
  },
  reviews: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('60%'),
    // backgroundColor: Colors.grey_light,
  },
  reviewsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('60%'),
    // backgroundColor: Colors.grey_light,
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
  address: {
    fontSize: hp('1.6%'),
    lineHeight: textLineHeight,
    color: Colors.grey_dark,
  },
});

export default DoctorList;
