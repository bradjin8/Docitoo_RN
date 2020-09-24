import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {mockDoctors} from '@/constants/MockUpData';
import {useStores} from "@/hooks";

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation(props);
  const [doctor, setDoctor] = useState(null);
  const [isReviewMode, setReviewMode] = useState(false);

  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState(null);


  const {user, data} = useStores();

  const fetchDoctor = async () => {
    await data.fetchDoctorById(user.sessionToken, data.selectedDoctorId);
    setDoctor(data.getSelectedDoctor);
  };

  const onPressBack = () => {
    if (nav.canGoBack())
      nav.goBack()
  };

  const onPressShare = () => {
    // nav.navigate(DoctorStackScreens.doctors)
    console.log(tag, 'onPressShare()')
  };

  const onPressWriteReview = () => {
    setReviewMode(true);
    console.log(tag, 'onPressWriteReview()', isReviewMode);
  };

  const onPressBook = () => {
    console.log(tag, 'onPressBook()', doctor.id);
    nav.navigate(DoctorStackScreens.bookDoctor)
  };

  const onSubmitReview = async () => {
    console.log(tag, 'submitReview', rating, description);
    try {
      await data.submitReview(user.sessionToken, doctor.id, rating, description);
      await fetchDoctor();
    } catch (e) {

    }
    setReviewMode(false);
  };

  const onPressCancel = () => {
    setReviewMode(false);
  };


  useEffect(()=>{
    fetchDoctor();
    return () => {
      setDoctor(null)
    }
  }, []);

  return {
    doctor, setDoctor,
    isReviewMode, setReviewMode,
    rating, setRating,
    description, setDescription,
    onPressBack,
    onPressShare,
    onPressWriteReview,
    onPressBook,
    onSubmitReview,
    onPressCancel
  }
}

export default useViewModel;
