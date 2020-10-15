import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens, TabStackScreens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();

  const onPressSignUp = () => {
    nav.navigate(Screens.signUp)
  };

  const onPressLogin = () => {
    nav.navigate(Screens.logIn)
  };

  const onPressSkipSignUp = () => {
    nav.navigate(Screens.tabStack);
  };

  return {
    onPressSignUp,
    onPressLogin,
    onPressSkipSignUp
  }
}

export default useViewModel;
