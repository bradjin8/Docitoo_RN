import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import ImagePicker from 'react-native-image-picker';
import __ from '@/assets/lang';
import {Platform, PermissionsAndroid} from 'react-native';
import Images from '@/styles/Images';
import {mockDoctors} from '@/constants/MockUpData';

function useViewModel(props) {
  const nav = useNavigation();

  const [doctors, setDoctors] = useState(mockDoctors);
  const [totalDoctorCount, setTotalDoctorCount] = useState(128289);

  const onPressSort = () => {
    nav.goBack()
  };

  const onPressSearch = async () => {
    const tag = 'Doctors::onPressSearch()';

  };

  return {
    doctors, setDoctors,
    totalDoctorCount, setTotalDoctorCount,
    onPressSort,
    onPressSearch,
  }
}

export default useViewModel;
