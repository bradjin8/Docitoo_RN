import React from 'react';
import {observer} from 'mobx-react';
import {ScrollView, StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import {ProfileCard} from '@/screens/More';
import Colors from "@/styles/Colors";
import Separator from "@/components/Separator";
import useViewModel from './methods';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {capitalizeString} from "@/utils/String";
import dateFormat from "node-datetime";
import {getColor} from "@/components/List/BookingList";

const ViewBooking = (props) => {
  const vm = useViewModel(props);
  const booking = vm.d_data.bookings.slice(0).filter(booking => booking.id === vm.d_data.selectedBookingId)[0];
  let {user} = booking;
  if (user) {
    user.accountType = 'User';
  }

  const getStatusDesc = status => {
    let _prev = 'Booking ';
    if (status == 'REQUESTED' || status == 'ACCEPTED') {
      _prev += 'is being ';
    } else {
      _prev += 'was ';
    }
    return _prev + status;
  };

  return (
    <BoardWithHeader title={__('booking_detail')}>
      {booking && user && <ScrollView style={styles.container}>

        <Space height={hp('1%')}/>
        <ProfileCard user={user}>
        </ProfileCard>
        <Space height={hp('4%')}/>
        <Separator color={'#000'} width={6}/>
        <KeyValueLabel name={__('email')} value={user.email}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('phone_number')} value={user.phoneNumber}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('gender')} value={user.gender}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('blood_type')} value={user.bloodType}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('language')} value={capitalizeString(user.language)}/>

        <Separator color={'#000'} width={6}/>
        <KeyValueLabel name={__('Booking Time')}
                       value={dateFormat.create(new Date(parseInt(booking.date))).format('H:M p, n D, Y')}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('Requested at')}
                       value={dateFormat.create(new Date(booking.createdAt)).format('H:M p, n D, Y')}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('Last updated at')}
                       value={dateFormat.create(new Date(booking.updatedAt)).format('H:M p, n D, Y')}/>
        <Separator color={Colors.grey} width={2}/>
        <View style={{
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            color: '#fff', width: wp('90%'), textAlign: 'center', height: hp('4%'),
            textAlignVertical: 'center',
            backgroundColor: getColor(booking.status),
          }}>
            {getStatusDesc(booking.status)}
          </Text>
        </View>
        <Space height={hp('3%')}/>
        {booking.status === 'REQUESTED' && <View style={{
          width: wp('90%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp('1%')
        }}>
          <TouchableHighlight
            style={styles.whiteButton1}
            onPress={() => {
              vm.handleReject(booking.id);
            }}
            underlayColor={Colors.blue1}>
            <Text style={styles.whiteButtonLabel}>
              {__('reject')}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.blueButton}
            onPress={() => {
              vm.handleAccept(booking.id);
            }}
            underlayColor={Colors.white2}>
            <Text style={styles.blueButtonLabel}>
              {__('accept')}
            </Text>
          </TouchableHighlight>
        </View>}
        <Space height={hp('3%')}/>

      </ScrollView>}
    </BoardWithHeader>

  )
};

export const KeyValueLabel = ({name, value}) => {
  const kvlStyles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      // backgroundColor: '#ddd',
      marginVertical: hp('1.8%'),
    },
    name: {
      fontSize: hp('1.8%'),
      width: wp('42%')
    },
    value: {
      fontSize: hp('1.8%'),
      fontWeight: 'bold',
    }

  });

  return (
    <View style={kvlStyles.container}>
      <Text style={kvlStyles.name}>{name}</Text>
      <Text style={kvlStyles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    flexDirection: 'column',
    height: '92%',
    // backgroundColor: '#666',
  },
  whiteButtonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: hp('1.8%'),
    borderRadius: hp('0.5%'),
    borderWidth: 1,
    borderColor: Colors.blue1,
    alignContent: 'center',
  },
  whiteButton1: {
    backgroundColor: '#FFF',
    width: wp('42%'),
    borderRadius: wp('0.5%'),
    borderWidth: 0.5,
    borderColor: Colors.blue1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  blueButtonLabel: {
    color: Colors.white2,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
});

export default observer(ViewBooking);
