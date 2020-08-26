import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import ImagePicker from 'react-native-image-picker';
import __ from '@/assets/lang';
import {Platform, PermissionsAndroid} from 'react-native';
import Images from '@/styles/Images';
import {mockDoctors} from '@/constants/MockUpData';

const tag = 'Screens::Doctors';

function useViewModel(props) {
  const nav = useNavigation();

  const [doctors, setDoctors] = useState(mockDoctors);
  const [totalDoctorCount, setTotalDoctorCount] = useState(128289);
  const [searchVisible, setSearchVisible] = useState(false);

  const onPressSort = () => {
    nav.goBack()
  };

  const onPressSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const applyFilter = (filter) => {
    console.log(tag, 'applyFilter()', filter);
    onPressSearch();
  };

  return {
    doctors, setDoctors,
    totalDoctorCount, setTotalDoctorCount,
    searchVisible, setSearchVisible,
    onPressSort,
    onPressSearch,
    applyFilter,
  }
}

export default useViewModel;
