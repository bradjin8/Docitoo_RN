import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {mockDoctors} from '@/constants/MockUpData';
import {useStores} from "@/hooks";
import {Share} from 'react-native';
import AppConfig from "@/config/AppConfig";
import __ from "@/assets/lang";

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation(props);
  const [doctor, setDoctor] = useState(null);
  const [isReviewMode, setReviewMode] = useState(false);
  const [isMapViewMode, setMapViewMode] = useState(true);

  const [rating, setRating] = useState(5);
  const [description, setDescription] = useState(null);
  const [routeID, setRouteID] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const {user, data} = useStores();

  let id = null;
  const {route} = props;
  if (route && route.params) {
    id = route.params.id;
  }
  // id = '5f6911799c06f46db319f23f';

  const searchDoctorAsync = async (_id) => {
    if (data.doctors.length < 1) {
      await data.searchDoctors(data.sessionToken);
    }
    data.selectDoctor(_id);
    await fetchDoctor();
  };

  if (!routeID && id) {
    // alert('ROUTE_ID: ' + id);
    console.log(data.doctors);
    setRouteID(id);
  }

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
      nav.goBack();
    else
      nav.navigate(Screens.home);
  };

  const onPressShare = () => {
    // nav.navigate(DoctorStackScreens.doctors)
    console.log(tag, 'onPressShare()');

    Share.share(
      {
        message: `${AppConfig.linkScheme}d/${doctor.id}`,
        url: `${AppConfig.linkScheme}d/${doctor.id}`,
        title: `Dr. ${doctor.fullName}, a ${__(doctor.speciality)}`
      },
      {
        // Android only:
        dialogTitle: `Share Dr. ${doctor.fullName}'s Profile`,
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      }
    ).then(({action, activityType}) => {
      if(action === Share.sharedAction)
        console.log('Share was successful', activityType);
      else
        console.log('Share was dismissed', activityType);
    })
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

  useEffect(() => {
    searchDoctorAsync(routeID);
  }, [routeID]);

  return {
    doctor, setDoctor,
    isReviewMode, setReviewMode,
    rating, setRating,
    description, setDescription,
    isLoading, setLoading,
    isMapViewMode, setMapViewMode,
    onPressBack,
    onPressShare,
    onPressWriteReview,
    onPressBook,
    onSubmitReview,
    onPressCancel,
    user,
  }
}

export default useViewModel;
