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


  const [isLoading, setLoading] = useState(false);

  const {user, data} = useStores();

  const fetchDoctor = async () => {
    setLoading(true);
    try {
      await data.fetchDoctorById(user.sessionToken, data.selectedDoctorId);
      setDoctor(data.getSelectedDoctor);
    } catch (e) {

    } finally {
      setLoading(false);
    }
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
    if (user.isValid) {
      setReviewMode(true);
      console.log(tag, 'onPressWriteReview()', isReviewMode);
    } else {
      nav.navigate(Screens.logIn);
    }
  };

  const onPressBook = () => {
    console.log(tag, 'onPressBook()', doctor.id);
    if (user.isValid) {
      nav.navigate(DoctorStackScreens.bookDoctor)
    } else {
      nav.navigate(Screens.logIn);
    }
  };

  const onSubmitReview = async () => {
    console.log(tag, 'submitReview', rating, description);
    try {
      setLoading(true);
      await data.submitReview(user.sessionToken, doctor.id, rating, description);
      await fetchDoctor();
    } catch (e) {

    }
    setLoading(false);
    setReviewMode(false);
  };

  const onPressCancel = () => {
    setReviewMode(false);
  };


  useEffect(() => {
    fetchDoctor();
    return () => {

    }
  }, []);

  return {
    doctor, setDoctor,
    isReviewMode, setReviewMode,
    rating, setRating,
    description, setDescription,
    isLoading, setLoading,
    onPressBack,
    onPressShare,
    onPressWriteReview,
    onPressBook,
    onSubmitReview,
    onPressCancel
  }
}

export default useViewModel;
