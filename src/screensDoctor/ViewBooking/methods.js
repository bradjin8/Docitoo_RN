import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MoreStackScreens, Screens} from '@/constants/Navigation';
import {mockUser} from '@/constants/MockUpData';
import {useStores} from "@/hooks";

function useViewModel(props) {
  const tag = 'Screens::MyProfile::';

  const nav = useNavigation(props);

  const {user, d_data} = useStores();

  const handleReject = (bookingId) => {
    d_data.rejectBooking(user.sessionToken, bookingId);
    nav.goBack();
  };

  const handleAccept = (bookingId) => {
    d_data.acceptBooking(user.sessionToken, bookingId);
    nav.goBack();
  };

  const onPressEdit = () => {
    console.log(tag, 'onPressEdit()');
    nav.navigate(MoreStackScreens.editProfile)
  };

  return {
    user,
    d_data,
    handleReject,
    handleAccept,
    onPressEdit
  }
}

export default useViewModel;
