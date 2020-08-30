import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignUp = () => {
    nav.navigate(Screens.signUp)
  };

  const onPressLogin = () => {
    nav.navigate(Screens.tabStack);
  };

  const onPressFacebook = () => {
  };

  const onPressGoogle = () => {
  };

  return {
    emailOrPhone, setEmailOrPhone,
    password, setPassword,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle
  }
}

export default useViewModel;
