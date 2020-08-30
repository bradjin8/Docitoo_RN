import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, MoreStackScreens, Screens, TabStackScreens} from '@/constants/Navigation';
import {mockUser} from '@/constants/MockUpData';
import __ from '@/assets/lang';

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation();

  const [lang, setLang] = useState('en');
  const langItems = [
    { label: __('english'), value: 'en'},
    { label: __('english'), value: 'en'},
    { label: __('english'), value: 'en'},
  ];
  const [user, setUser] = useState(mockUser);

  const onPressSearchDoctors = () => {
    nav.navigate(TabStackScreens.doctorStack);
  };

  const onPressPillReminder = () => {
    nav.navigate(TabStackScreens.pillReminder)
  };

  const onPressAccountSettings = () => {
    nav.navigate(MoreStackScreens.myProfile)
  };

  const onPressTermsAndConditions = () => {
    nav.navigate(MoreStackScreens.termsAndConditions)
  };

  const onPressContactUs = () => {
    nav.navigate(MoreStackScreens.contactUs)
  };

  const onPressLogout = () => {
    nav.navigate(Screens.logIn);
  };

  return {
    lang, setLang,
    langItems,
    user,
    onPressSearchDoctors,
    onPressPillReminder,
    onPressAccountSettings,
    onPressTermsAndConditions,
    onPressContactUs,
    onPressLogout,
  }
}

export default useViewModel;
