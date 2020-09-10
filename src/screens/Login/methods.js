import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import {useGotoMain} from '@/hooks';
import {Alert} from 'react-native';

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('email', 'Please enter email'))
    .email(errorMessage('email', 'Please enter a valid email')),
  password: string()
    .required(errorMessage('password', 'Please enter password'))
});

function useViewModel(props) {
  const tag = 'Screen::Login::';
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

  const onPressLogin = async () => {
    // nav.navigate(Screens.tabStack);
    try {
      const params = await yup.validate({email: emailOrPhone, password}, {abortEarly: false});
      // hud.show()

      await user.logIn(params.email, params.password);

      // When user became valid, then it means login succeed
      if (user.isValid) {
        go2Main();
      } else {
        // Login Failed, Display Some Error Message
        Alert.alert(
          "Error",
          "Login Failed, try again",
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

    }
  };

  const onPressFacebook = () => {
  };

  const onPressGoogle = () => {
  };

  useEffect( () => {
    setEmailOrPhone(user.email);
    if (user.isValid) {
      go2Main();
    }
  }, []);

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
