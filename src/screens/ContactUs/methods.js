import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();

  const tag = 'Screens::ContactUs::';

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onPressSend = () => {
    console.log(tag, 'onPressSend()', subject, message);
  };

  const onPressImage = () => {
    console.log(tag, 'onPressImage()');
  };

  return {
    subject, setSubject,
    message, setMessage,
    onPressSend,
    onPressImage,
  }
}

export default useViewModel;
