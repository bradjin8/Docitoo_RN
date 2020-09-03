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

const DoctorList = ({doctors, onPressDoctor}) => {
  return (
    <DoctorListView doctors={doctors} onPressDoctor={onPressDoctor}/>
  );
};

const DoctorListView = ({doctors, onPressDoctor}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={{marginBottom: 80 * scale}}
        data={doctors}
        renderItem={({item}) => <DoctorRow
          onPressDoctor={onPressDoctor}
          doctor={item}
          key={item.id}
        />}
        ItemSeparatorComponent={() => <Separator color={Colors.grey}/>}
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
          {doctor.speciality}
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
          {doctor.speciality}
        </Text>
        <Text style={styles.availableTime}>
          {formatHour(doctor.availableTime.from) + ' - ' + formatHour(doctor.availableTime.to)}
        </Text>
        <DoctorReview style={styles.reviewsCard} reviews={doctor.reviews}/>
      </View>
    </View>
  )
};

const DoctorReview = ({reviews}) => {
  const [averageRating, setAverageRating] = useState(0.0);

  // On Component did mount
  useEffect(() => {
    let totalRating = 0.0;
    reviews.map(item => {
      totalRating += parseFloat(item.rating);
    });
    // console.log('DoctorList', 'TotalRating', totalRating);
    setAverageRating(totalRating / reviews.length);
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
        starStyle={{
          width: 15 * scale,
          height: 15 * scale,
        }}
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

const rowHeight = 110;
const textLineHeight = rowHeight / 4;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 14 * scale,
  },
  avatar: {
    width: rowHeight * scale,
    height: rowHeight * scale,
    borderRadius: 5,
  },
  containerText: {
    flexDirection: 'column',
    marginLeft: 20 * scale,
    height: rowHeight * scale,
    alignItems: 'stretch',
    width: '100%'
  },
  name: {
    fontSize: 20 * scale,
    fontWeight: 'bold',
    height: textLineHeight * scale
  },
  speciality: {
    fontSize: 18 * scale,
    height: textLineHeight * scale,
    color: Colors.grey_dark,
  },
  specialityCard: {
    fontSize: 18 * scale,
    marginVertical: 3 * scale,
    height: textLineHeight * scale,
    color: Colors.black,
  },
  availableTime: {
    fontSize: 16 * scale,
    height: textLineHeight * scale,
    color: '#aaa',
  },
  reviews: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    // backgroundColor: Colors.grey_light,
  },
  reviewsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    // backgroundColor: Colors.grey_light,
  },
  starBar: {
    color: 'transparent',
    // height: 30,
  },
  starImage: {
    width: 15 * scale,
    height: 15 * scale,
  },
  ratingCount: {
    fontSize: 18 * scale,
    // position: 'absolute',
    // right: 0,
  },
  address: {
    fontSize: 15 * scale,
    lineHeight: textLineHeight * scale,
    color: Colors.grey_dark,
    position: 'absolute',
    bottom: 0
  },
});

export default DoctorList;
