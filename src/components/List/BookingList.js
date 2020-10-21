import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, SectionList, TouchableOpacity, TouchableHighlight, FlatList, Text} from 'react-native';
import Colors from '@/styles/Colors';
import Separator from '@/components/Separator';
import dateFormat from 'node-datetime';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const BookingList = ({bookings, onPressBooking}) => {
  return (
    <BookingListView bookings={bookings} onPressBooking={onPressBooking}/>
  );
};

const BookingListView = ({bookings, onPressBooking}) => {
  return (
    <View style={{paddingBottom: hp('10%')}}>
      <FlatList
        style={{marginBottom: hp('5%')}}
        data={bookings}
        renderItem={({item}) => <BookingRow
          onPressBooking={onPressBooking}
          booking={item}
          key={item.id}
        />}
        ItemSeparatorComponent={() => <Separator color={'#f3f3f3'}/>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
};

export const getColor = (status) => {
  if (status == 'REQUESTED') {
    return '#321fdb';
  } else if (status == 'ACCEPTED') {
    return '#3399ff';
  } else if (status == 'CANCELED') {
    return '#f9b115';
  } else if (status == 'REJECTED') {
    return '#e55353';
  } else if (status == 'COMPLETED') {
    return '#2eb85c';
  } else {
    return '#636f83';
  }
};

export const BookingRow = ({booking, onPressBooking}) => {
  console.log(booking);

  return (
    <TouchableOpacity style={{...styles.container}} onPress={() => onPressBooking(booking)}>
      <Image source={{uri: booking.user.avatarUrl}} style={styles.avatar}/>
      <View style={styles.containerText}>
        <Text style={styles.name}>
          From: {booking.user.fullName}
        </Text>
        <Text style={styles.speciality}>
          Time: {'\t' + dateFormat.create(new Date(parseInt(booking.date))).format('H:M p, n D, Y')}
        </Text>
        <Text style={styles.address}>
          {'Status: \t'}
          <Text style={{
            backgroundColor: getColor(booking.status), color: '#fff',
          }}>{`  ${booking.status}  `}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
};

const rowHeight = hp('10%');
const textLineHeight = rowHeight / 5;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
    // borderRadius: 10,
    // padding: 2
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

export default BookingList;
