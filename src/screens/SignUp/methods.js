import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const onPressSignUp = () => {
    nav.navigate(Screens.shareMoreDetails);
  };

  const onPressLogin = () => {
    nav.navigate(Screens.logIn);
  };

  const onPressFacebook = () => {

  };

  const onPressGoogle = () => {

  };

  return {
    fullName, setFullName,
    emailAddress, setEmailAddress,
    phoneNumber, setPhoneNumber,
    password, setPassword,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle
  }
}

export default useViewModel;
