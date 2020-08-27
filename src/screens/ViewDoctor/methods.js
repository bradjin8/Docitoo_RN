import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {mockDoctors} from '@/constants/MockUpData';

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation();
  const [doctor, setDoctor] = useState(null);

  const onPressBack = () => {
    if (nav.canGoBack())
      nav.goBack()
  };

  const onPressWriteReview = () => {
  };

  const onPressBook = () => {
  };

  useEffect(()=>{
    setDoctor(mockDoctors[0])
  }, []);

  return {
    doctor, setDoctor,
    onPressBack,
    onPressWriteReview,
    onPressBook,
  }
}

export default useViewModel;
