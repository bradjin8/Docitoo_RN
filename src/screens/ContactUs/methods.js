import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();

  const tag = 'Screens::ContactUs::';

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scroll, setScroll] = useState(null);

  const onPressSend = () => {
    console.log(tag, 'onPressSend()', subject, message);
  };

  const onPressImage = () => {
    console.log(tag, 'onPressImage()');
  };

  const scrollToInput = (reactNode) => {
    if (scroll) {
      scroll.props.scrollToFocusedInput(reactNode)
    }
  };

  return {
    subject, setSubject,
    message, setMessage,
    // scroll, setScroll,
    onPressSend,
    onPressImage,
    // scrollToInput,
  }
}

export default useViewModel;
