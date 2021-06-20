import React, {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import * as SocialApi from '@/Services/SocialApi';
import {checkCode, sendCodeSMS} from '@/Services/Api';

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('message', 'Please enter email'))
    .email(errorMessage('message', 'Please enter a valid email')),
  fullName: string()
    .required(errorMessage('message', 'Please enter full name')),
  password: string()
    .required(errorMessage('message', 'Please enter password')),
});
const yup1 = object().shape({
  fullName: string()
    .required(errorMessage('message', 'Please enter full name')),
  phoneNumber: string(),
});

function useViewModel(props) {
  const tag = ('Screens::SignUp');
  const nav = useNavigation(props);
  const {user} = useStores();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [authMode, setAuthMode] = useState('phone');
  const [validPhone, setValidPhone] = useState(false);
  const [delay, setDelay] = useState(0);
  const phoneInput = useRef();

  const _signUp = (_fullName, _email, _pwd, _phoneNumber, _isSocial) => {
    setTimeout(async () => {
      try {
        if (authMode === 'email' || _isSocial) {
          const params = await yup.validate(
            {email: _email, fullName: _fullName, password: _pwd /*phoneNumber: _phoneNumber*/},
            {abortEarly: false},
          );

          await user.signUp(params.email, params.fullName, params.password /*params.phoneNumber*/);
        } else if (authMode === 'phone') {
          const params = await yup1.validate(
            {fullName: _fullName, phoneNumber: _phoneNumber},
            {abortEarly: false},
          );
          await user.signUp('', params.fullName, '', params.phoneNumber);
        }

        if (user.isValid) {
          if (user.accountType === 'Doctor') {
            nav.navigate(Screens.doctorFlow);
          } else {
            nav.navigate(Screens.shareMoreDetails);
          }
        } else {
          let error = 'Unknown Error';
          if (user.getStatusCode === 409) {
            error = 'Email/Phone already exists';
          } else if (user.getStatusCode === 404) {
            error = 'Can not find the server';
          }
          Alert.alert(
            'SignUp Failed',
            `${error}, try again`,
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'onPressLogin', 'OK pressed'),
              },
            ],
            {cancelable: false},
          );
        }
      } catch (e) {
        if (e.errors && e.errors.length > 0) {
          Alert.alert('Login Error: ' + e.errors[0].message);
        } else {
          Alert.alert('Login Error' + e.name + ': ' + e.message);
        }
      } finally {
        //hud.hide()
      }
    }, 10);
  };

  const onPressSignUp = async () => {
    if (authMode === 'email') {
      _signUp(fullName, email, password);
    } else {
      _signUp(fullName, '', '', phone);
    }
  };

  const onPressLogin = () => {
    nav.navigate(Screens.logIn);
  };

  const onPressFacebook = async () => {
    const {data, error} = await SocialApi.facebookAuth();
    if (error) {
      Alert.alert('Facebook SignUp Error', error.name + ': ' + error.message);
      return;
    }

    const {name, email, id} = data;
    _signUp(name, email, id, '', true);
  };

  const onPressGoogle = async () => {
    const {data, error} = await SocialApi.googleAuth();
    if (error) {
      Alert.alert('Facebook SignUp Error', error.name + ': ' + error.message);
      return;
    }

    const {name, email, id} = data;
    _signUp(name, email, id, '', true);
  };

  const startDownCount = () => {
    setDelay(60);
  };

  const onPressSend = async () => {
    if (delay === 0 && phoneInput.current) {
      startDownCount();
      const formattedNumber = phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber;
      const {data, ok} = await sendCodeSMS(formattedNumber);
      console.log(data, ok);
      if (ok) {
        startDownCount();
      } else {
        Alert.alert('SMS Verification Service Error');
      }
    }
  };

  const onPressVerify = async () => {
    if (delay > 0 && phoneInput.current) {
      const formattedNumber = phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber;
      const {data, ok} = await checkCode(formattedNumber, code);
      console.log(data, ok);
      if (ok && data.valid) {
        _signUp(fullName, '', '', formattedNumber);
      } else {
        Alert.alert('Verification Error');
      }
      setDelay(0);
    }
  };

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (delay > 0) {
      setTimeout(() => {
        setDelay(delay - 1);
      }, 1000);
    } else {
      setCode('');
    }
  }, [delay]);

  useEffect(() => {
    if (phoneInput && phoneInput.current) {
      const formattedNumber = phoneInput.current.getNumberAfterPossiblyEliminatingZero().formattedNumber;
      console.log('formatted-num', formattedNumber);
      setValidPhone(phoneInput.current.isValidNumber(formattedNumber));
    } else {
      setValidPhone(false);
    }
  }, [phone]);

  return {
    fullName, setFullName,
    email, setEmail,
    password, setPassword,
    phone, setPhone,
    code, setCode,
    delay, setDelay,
    authMode, setAuthMode,
    validPhone,
    phoneInput,
    user,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle,
    onPressSend,
    onPressVerify,
  };
}

export default useViewModel;
