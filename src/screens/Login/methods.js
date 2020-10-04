import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import {Alert} from 'react-native';
import * as SocialApi from '@/Services/SocialApi';

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('message', 'Please enter email'))
    .email(errorMessage('message', 'Please enter a valid email')),
  password: string()
    .required(errorMessage('message', 'Please enter password'))
});

function useViewModel(props) {
  const tag = 'Screen::Login';
  const nav = useNavigation(props);

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useStores();


  const go2Main = () => {
    nav.navigate(Screens.tabStack);
  };

  const onPressSignUp = () => {
    nav.navigate(Screens.signUp)
  };

  const _login = (_email, _pwd) => {
    setTimeout(async (_email, _pwd) => {
      try {
        const params = await yup.validate({email: _email.toString(), password: _pwd.toString()}, {abortEarly: false});
        console.log(tag, 'Login', params);
        // hud.show()

        await user.logIn(params.email, params.password);

        // When user became valid, then it means login succeed
        if (user.isValid) {
          go2Main();
        } else {
          // Login Failed, Display Some Error Message
          Alert.alert(
            "Login Failed",
            '' + user.lastError,
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'Login', 'OK pressed')
              }
            ],
            {cancelable: false}
          )
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
    _login(emailOrPhone, password);
  };

  const onPressFacebook = async () => {
    const {data, error} = await SocialApi.facebookAuth();
    if (error) {
      Alert.alert('Facebook Login Error', error.name + ': ' + error.message);
      return;
    }

    const {email, id} = data;
    _login(email, id);

  };

  const onPressGoogle = async () => {
    const {data, error} = await SocialApi.googleAuth();
    if (error) {
      Alert.alert('Google Login Error', error.name + ': ' + error.message);
      return;
    }

    const {email, id} = data;
    _login(email, id);
  };

  useEffect(() => {
    setEmailOrPhone(user.email);
    if (user.isValid) {
      go2Main();
    }
  }, []);

  return {
    emailOrPhone, setEmailOrPhone,
    password, setPassword,
    user,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle
  }
}

export default useViewModel;
