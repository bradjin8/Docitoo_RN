import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import {useStores} from "@/hooks";
import {object, string} from 'yup';
import {errorMessage} from "@/utils/Yup";

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('email', 'Please enter email'))
    .email(errorMessage('email', 'Please enter a valid email')),
  fullName: string()
    .required(errorMessage('fullName', 'Please enter full name')),
  password: string()
    .required(errorMessage('password', 'Please enter password')),
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

  const onPressSignUp = async () => {
    try {
      const params = await yup.validate(
        {email, fullName, password, phoneNumber},
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
      console.log(tag, 'OnPressSignUp, Ex', e.message);
      if (e.errors) {
        console.log(tag, 'Validation Error', e.errors)
      }
    } finally {
      //hud.hide()
    }
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
    email, setEmail,
    phoneNumber, setPhoneNumber,
    password, setPassword,
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle
  }
}

export default useViewModel;
