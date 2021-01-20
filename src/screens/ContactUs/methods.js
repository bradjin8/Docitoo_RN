import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import {sendMessage} from '@/Services/Api';
import {useStores} from '@/hooks';
import __ from '@/assets/lang';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import {Alert} from 'react-native';

const yup = object().shape({
  subject: string()
    .required(errorMessage('message', 'Please enter email')),
  message: string()
    .required(errorMessage('message', 'Please enter password')),
});

function useViewModel(props) {
  const nav = useNavigation();

  const tag = 'Screens::ContactUs::';

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scroll, setScroll] = useState(null);

  const {user} = useStores();

  const onPressSend = async () => {
    console.log(tag, 'onPressSend()', subject, message);
    try {
      const params = await yup.validate({subject, message}, {abortEarly: false});
      console.log(tag, 'params', params);
      // if (user.isValid) {
        await sendMessage(params.subject, params.message);
      // } else {
      //   alert(__('session_expired'));
      //   nav.navigate(Screens.logIn);
      // }
      alert('Your message was successfully sent.');
      setSubject('');
      setMessage('');
    } catch (e) {
      console.log(tag, 'ContactUS, Ex:', e);
      if (e.errors && e.errors.length > 0) {
        Alert.alert('Error: ' + e.errors[0].message);
      } else {
        Alert.alert('Error' + e.name + ': ' + e.message);
      }
    }
  };

  const onPressImage = () => {
    console.log(tag, 'onPressImage()');
  };

  const scrollToInput = (reactNode) => {
    if (scroll) {
      scroll.props.scrollToFocusedInput(reactNode);
    }
  };

  return {
    subject, setSubject,
    message, setMessage,
    // scroll, setScroll,
    onPressSend,
    onPressImage,
    // scrollToInput,
  };
}

export default useViewModel;
