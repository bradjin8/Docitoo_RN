import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MoreStackScreens, Screens} from '@/constants/Navigation';
import {mockUser} from '@/constants/MockUpData';
import {useStores} from "@/hooks";

function useViewModel(props) {
  const tag = 'Screens::MyProfile::';

  const nav = useNavigation(props);

  const [user, setUser] = useState({});
  const store = useStores();

  const onPressEdit = () => {
    console.log(tag, 'onPressEdit()');
    nav.navigate(MoreStackScreens.editProfile)
  };

  useEffect(() => {
    setUser(store.user);
  }, [store.user.lastUpdatedAt]);

  const onPressBack = () => {
    if (nav.canGoBack()) {
      nav.goBack();
    } else {
      nav.navigate(Screens.home);
    }
  };

  return {
    user,
    onPressEdit,
    onPressBack,
  }
}

export default useViewModel;
