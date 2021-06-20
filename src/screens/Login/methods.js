import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, DoctorTabStackScreens, Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import {Alert} from 'react-native';
import * as SocialApi from '@/Services/SocialApi';
import {sendCodeSMS, checkCode} from '@/Services/Api';

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('message', 'Please enter email'))
    .email(errorMessage('message', 'Please enter a valid email')),
  password: string()
    .required(errorMessage('message', 'Please enter password')),
});

const yup1 = object().shape({
  phoneNumber: string()
    .required(errorMessage('message', 'Please enter your phone number')),
});

function useViewModel(props) {
  const tag = 'Screen::Login';
  const nav = useNavigation(props);
  const phoneInput = useRef();
  const {user} = useStores();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [code, setCode] = useState('');
  const [authMode, setAuthMode] = useState('phone');
  const [validPhone, setValidPhone] = useState(false);
  const [delay, setDelay] = useState(0);


  const go2Main = () => {
    if (user.accountType === 'Doctor') {
      nav.navigate(Screens.doctorFlow);
    } else {
      nav.navigate(Screens.userFlow);
    }
  };

  const onPressSignUp = () => {
    nav.navigate(Screens.signUp);
  };

  const _login = (_email, _pwd, _isSocial) => {
    setTimeout(async (_email, _pwd) => {
      try {
        if (_isSocial !== true) {
          if (authMode === 'email') {
            const params = await yup.validate({
              email: _email.toString(),
              password: _pwd.toString(),
            }, {abortEarly: false});
            console.log(tag, 'Login', params);
            // hud.show()

            await user.logIn(params.email, params.password);
          } else if (authMode === 'phone') {
            const params = await yup1.validate({phoneNumber: _email.toString()}, {abortEarly: false});
            console.log(tag, 'LoginWithPhone', params);
            await user.logInWithPhone(params.phoneNumber);
          }
        } else {
          const params = await yup.validate({email: _email.toString(), password: _pwd.toString()}, {abortEarly: false});
          console.log(tag, 'Social Login', params);
          await user.logIn(params.email, params.password);
        }
        // When user became valid, then it means login succeed
        if (user.isValid) {
          go2Main();
        } else {
          // Login Failed, Display Some Error Message
          Alert.alert(
            'Login Failed',
            '' + user.lastError,
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'Login', 'OK pressed'),
              },
            ],
            {cancelable: false},
          );
        }

      } catch (e) {
        console.log(tag, 'Login, Ex:', e);
        if (e.errors && e.errors.length > 0) {
          Alert.alert('Login Error: ' + e.errors[0].message);
        } else {
          Alert.alert('Login Error' + e.name + ': ' + e.message);
        }
      }
    }, 10, _email, _pwd);
  };

  const onPressLogin = () => {
    if (authMode === 'email') {
      _login(email, password);
    } else {
      _login(phone);
    }
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
        _login(formattedNumber);
      } else {
        Alert.alert('Verification Error');
      }
      setDelay(0);
    }
  };

  const onPressFacebook = async () => {
    const {data, error} = await SocialApi.facebookAuth();
    if (error) {
      Alert.alert('Facebook Login Error', error.name + ': ' + error.message);
      return;
    }

    const {email, id} = data;
    _login(email, id, true);

  };

  const onPressGoogle = async () => {
    const {data, error} = await SocialApi.googleAuth();
    if (error) {
      Alert.alert('Google Login Error', error.name + ': ' + error.message);
      return;
    }

    const {email, id} = data;
    _login(email, id, true);
  };

  useEffect(() => {
    // setEmail(user.email);
    // setPhone(user.phoneNumber);
    if (user.isValid) {
      go2Main();
    }
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
      setValidPhone(phoneInput.current.isValidNumber(formattedNumber));
    } else {
      setValidPhone(false);
    }
  }, [phone]);

  return {
    email, setEmail,
    password, setPassword,
    phone, setPhone,
    code, setCode,
    authMode, setAuthMode,
    delay, validPhone,
    user,
    phoneInput,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle,
    onPressSend,
    onPressVerify,
  };
}

export default useViewModel;
