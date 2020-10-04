import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import {useStores} from "@/hooks";
import {object, string} from 'yup';
import {errorMessage} from "@/utils/Yup";
import * as SocialApi from '@/Services/SocialApi';

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('message', 'Please enter email'))
    .email(errorMessage('message', 'Please enter a valid email')),
  fullName: string()
    .required(errorMessage('message', 'Please enter full name')),
  password: string()
    .required(errorMessage('message', 'Please enter password')),
  phoneNumber: string()
});

function useViewModel(props) {
  const tag = ('Screens::SignUp');
  const nav = useNavigation(props);
  const {user} = useStores();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [password, setPassword] = useState('');

  const _signUp = (_fullName, _email, _pwd, _phoneNumber) => {
    setTimeout(async () => {
      try {
        const params = await yup.validate(
          {email: _email, fullName: _fullName, password: _pwd, phoneNumber: _phoneNumber},
          {abortEarly: false}
        );

        await user.signUp(params.email, params.fullName, params.password, params.phoneNumber);

        if (user.isValid) {
          nav.navigate(Screens.shareMoreDetails);
        } else {
          let error = 'Unknown Error';
          if (user.getStatusCode === 409) {
            error = 'Email already exists'
          } else if (user.getStatusCode === 404) {
            error = 'Can not find the server'
          }
          Alert.alert(
            "SignUp Failed",
            `${error}, try again`,
            [
              {
                text: 'OK',
                onPress: () => console.log(tag, 'onPressLogin', 'OK pressed')
              }
            ],
            {cancelable: false}
          )
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
    }, 10)
  };

  const onPressSignUp = async () => {
    _signUp(fullName, email, password, phoneNumber)
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
    _signUp(name, email, id);
  };

  const onPressGoogle = async () => {
    const {data, error} = await SocialApi.googleAuth();
    if (error) {
      Alert.alert('Facebook SignUp Error', error.name + ': ' + error.message);
      return;
    }

    const {name, email, id} = data;
    _signUp(name, email, id);
  };

  return {
    fullName, setFullName,
    email, setEmail,
    phoneNumber, setPhoneNumber,
    password, setPassword,
    user,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle
  }
}

export default useViewModel;
