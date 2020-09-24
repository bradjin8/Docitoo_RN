import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {mockDoctors} from '@/constants/MockUpData';
import {useStores} from "@/hooks";

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation(props);
  const [doctor, setDoctor] = useState(null);
  const {user, data} = useStores();

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
    setDoctor(data.getSelectedDoctor);
    return () => {
      setDoctor(null)
    }
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
