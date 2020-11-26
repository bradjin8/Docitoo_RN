import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, MoreStackScreens, Screens, TabStackScreens} from '@/constants/Navigation';
import {mockUser} from '@/constants/MockUpData';
import { useIsFocused } from '@react-navigation/native';
import {useStores} from "@/hooks";
import __ from '@/assets/lang';

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation(props);

  const langItems = [
    {label: 'English', value: 'english'},
    {label: 'Kurdî', value: 'kurdish'},
    {label: 'عربى', value: 'arabic'},
  ];
  const store = useStores();
  const [user, setUser] = useState(store.user);

  const onPressSearchDoctors = () => {
    nav.navigate(TabStackScreens.doctorStack);
  };

  const onPressPillReminder = () => {
    nav.navigate(TabStackScreens.pillReminderStack)
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

  const onPressLogout = async () => {
    // nav.navigate(Screens.home);
    try {
      await store.user.logOut();
    } catch (e) {
      console.log(tag, 'OnPressLogout, Ex', e.message)
    } finally {
      nav.navigate(Screens.home);
    }
  };

  const changeLanguage = async (value) => {
    await store.user.changeLanguage(value);
    setUser(store.user);
    nav.setParams('lang', value);
  };

  // useIsFocused();

  return {
    langItems,
    user,
    onPressSearchDoctors,
    onPressPillReminder,
    onPressAccountSettings,
    onPressTermsAndConditions,
    onPressContactUs,
    onPressLogout,
    changeLanguage,
  }
}

export default useViewModel;
