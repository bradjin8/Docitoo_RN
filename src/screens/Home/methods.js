import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();

  const onPressSignUp = () => {
    nav.navigate(Screens.signUp)
  }
}

export default useViewModel;
