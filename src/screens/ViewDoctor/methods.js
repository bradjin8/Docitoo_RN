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

  const onPressShare = () => {
    // nav.navigate(DoctorStackScreens.doctors)
    console.log(tag, 'onPressShare()')
  };

  const onPressWriteReview = () => {
    console.log(tag, 'onPressWriteReview()', doctor.id)
  };

  const onPressBook = () => {
    console.log(tag, 'onPressBook()', doctor.id);
    nav.navigate(DoctorStackScreens.bookDoctor)
  };

  useEffect(()=>{
    setDoctor(mockDoctors[0])
  }, []);

  return {
    doctor, setDoctor,
    onPressBack,
    onPressShare,
    onPressWriteReview,
    onPressBook,
  }
}

export default useViewModel;
