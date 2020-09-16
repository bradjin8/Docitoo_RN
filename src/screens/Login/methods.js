import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {DoctorStackScreens, Screens} from '@/constants/Navigation';
import {useStores} from '@/hooks';
import {object, string} from 'yup';
import {errorMessage} from '@/utils/Yup';
import {Alert} from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import Config from '@/config/AppConfig';

// define YupModel
const yup = object().shape({
  email: string()
    .required(errorMessage('email', 'Please enter email'))
    .email(errorMessage('email', 'Please enter a valid email')),
  password: string()
    .required(errorMessage('password', 'Please enter password'))
});

function useViewModel(props) {
  const tag = 'Screen::Login';
  const nav = useNavigation(props);

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const {user} = useStores();

  GoogleSignin.configure({
    scopes: Config.googleSignIn.scopes,
    // webClientId: Config.googleSignIn.webClient.id,
    // offlineAccess: false,
    iosClientId: Config.googleSignIn.iosClientId
  });

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

  const onPressGoogle = async () => {
    try {
      const hasPlayServices = await GoogleSignin.hasPlayServices();

      if (!hasPlayServices) {
        console.log(tag, 'onPressGoogle', 'Device doesn\'t have PlayServices');
      }

      let userInfo;
      if (GoogleSignin.isSignedIn()) {
        // userInfo = await GoogleSignin.getCurrentUser();
        await GoogleSignin.signOut();
      } else {
      }

      userInfo = await GoogleSignin.signIn();

      const {user} = userInfo;
      console.log(user);

      // console.log(await GoogleSignin.getTokens());
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(tag, 'onPressGoogle()', 'Cancelled');

      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(tag, 'onPressGoogle()', 'In progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(tag, 'onPressGoogle()', 'Play services not available');
      } else {
        // some other error happened
        console.log(tag, 'onPressGoogle()', 'other error', error.message);
      }
    }
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
    onPressSignUp,
    onPressLogin,
    onPressFacebook,
    onPressGoogle
  }
}

export default useViewModel;
