import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, MoreStackScreens, Screens, TabStackScreens} from '@/constants/Navigation';
import {mockUser} from '@/constants/MockUpData';
import {useStores} from "@/hooks";
import __ from '@/assets/lang';

const tag = 'Screens::ViewDoctor';

function useViewModel(props) {
  const nav = useNavigation(props);

  const [lang, setLang] = useState('english');
  const langItems = [
    {label: 'English', value: 'english'},
    {label: 'Kurdî', value: 'kurdish'},
    {label: 'عربى', value: 'arabic'},
  ];
  const [user, setUser] = useState();
  const store = useStores();

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
      await user.logOut();
    } catch (e) {
      console.log(tag, 'OnPressLogout, Ex', e.message)
    } finally {
      nav.navigate(Screens.home);
    }
  };

  const changeLanguage = (value) => {
    store.user.changeLanguage(value);
    setLang(value)
  };

  useEffect(() => {
    setUser(store.user);
  }, [store.user]);

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
    changeLanguage,
  }
}

export default useViewModel;
