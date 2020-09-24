import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, PillStackScreens} from '@/constants/Navigation';
import {useStores} from "@/hooks";
import {SPECIALITIES} from '@/constants/MockUpData';


function useViewModel(props) {
  const tag = 'Screens::DoctorsByCategory::';

  const nav = useNavigation(props);

  const [searchString, setSearchString] = useState('');
  const {user, data} = useStores();

  const onPressGynecologist = () => {
    console.log(tag, 'onPressGynecologist()');
    handleSearchByCategory(SPECIALITIES.gynecologist);
  };

  const onPressSkin = () => {
    console.log(tag, 'onPressSkin()');
    handleSearchByCategory(SPECIALITIES.skin_specialist);
  };

  const onPressChild = () => {
    console.log(tag, 'onPressChild()');
    handleSearchByCategory(SPECIALITIES.child_specialist);
  };

  const onPressOrthopedic = () => {
    console.log(tag, 'onPressOrthopedic()');
    handleSearchByCategory(SPECIALITIES.orthopedic_surgeon);
  };

  const onPressENT = () => {
    console.log(tag, 'onPressENT()');
    handleSearchByCategory(SPECIALITIES.ent_specialist);
  };

  const onPressDiagnostics = () => {
    console.log(tag, 'onPressDiagnostics()');
    handleSearchByCategory(SPECIALITIES.diagnostics);
  };

  const onPressDiabetes = () => {
    console.log(tag, 'onPressDiabetes()');
    handleSearchByCategory(SPECIALITIES.diabetes_specialist);
  };

  const onPressEye = () => {
    console.log(tag, 'onPressEye())');
    handleSearchByCategory(SPECIALITIES.eye_specialist);
  };

  const handleSearchByCategory = async (category) => {
    await data.fetchDoctorsByCategory(user.sessionToken, category);
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
