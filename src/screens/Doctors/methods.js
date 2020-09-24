import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {Platform, PermissionsAndroid} from 'react-native';
import {useStores} from "@/hooks";

const tag = 'Screens::Doctors';

function useViewModel(props) {
  const nav = useNavigation(props);


  const [doctors, setDoctors] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const {user, data} = useStores();

  const onPressSort = () => {
    // nav.goBack()

  };

  const onPressSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const onPressDoctor = (doctor) => {
    console.log(tag, 'onPressDoctor()', doctor);
    data.selectDoctor(doctor.id);

    nav.navigate(DoctorStackScreens.viewDoctor);
  };

  const applyFilter = (filter) => {
    console.log(tag, 'applyFilter()', filter);
    onPressSearch();
  };

  useEffect(() => {
    if (data.lastStatus == '401') {
      nav.navigate(Screens.logIn);
      user.logOut();
      alert('Session expired');
    }
    setDoctors(data.doctors);
  }, []);

  return {
    doctors, setDoctors,
    searchVisible, setSearchVisible,
    onPressSort,
    onPressSearch,
    onPressDoctor,
    applyFilter,
  }
}

export default useViewModel;
