import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, PillStackScreens} from '@/constants/Navigation';

function useViewModel(props) {
  const tag = 'Screens::DoctorsByCategory::';

  const nav = useNavigation();

  const [searchString, setSearchString] = useState('');

  const onPressGynecologist = () => {
    console.log(tag, 'onPressGynecologist()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressSkin = () => {
    console.log(tag, 'onPressSkin()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressChild = () => {
    console.log(tag, 'onPressChild()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressOrthopedic = () => {
    console.log(tag, 'onPressOrthopedic()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressENT = () => {
    console.log(tag, 'onPressENT()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressDiagnostics = () => {
    console.log(tag, 'onPressDiagnostics()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressDiabetes = () => {
    console.log(tag, 'onPressDiabetes()');
    nav.navigate(DoctorStackScreens.doctors);
  };

  const onPressEye = () => {
    console.log(tag, 'onPressEye())');
    nav.navigate(DoctorStackScreens.doctors);
  };

  return {
    searchString, setSearchString,
    onPressGynecologist,
    onPressSkin,
    onPressChild,
    onPressOrthopedic,
    onPressENT,
    onPressDiagnostics,
    onPressDiabetes,
    onPressEye,
  }
}

export default useViewModel;
