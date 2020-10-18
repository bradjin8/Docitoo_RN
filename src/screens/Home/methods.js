import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens, TabStackScreens} from '@/constants/Navigation';
import {useStores} from "@/hooks";

function useViewModel(props) {
  const nav = useNavigation();
  const {user} = useStores();

  const onPressSignUp = () => {
    nav.navigate(Screens.signUp)
  };

  const onPressLogin = () => {
    nav.navigate(Screens.logIn)
  };

  const onPressSkipSignUp = async () => {
    await user.logOut();
    nav.navigate(Screens.tabStack);
  };

  return {
    onPressSignUp,
    onPressLogin,
    onPressSkipSignUp
  }
}

export default useViewModel;
