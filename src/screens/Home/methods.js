import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens, TabStackScreens} from '@/constants/Navigation';
import {Linking} from "react-native";
import DeepLinking from "react-native-deep-linking";
import AppConfig from "@/config/AppConfig";
import {useStores} from "@/hooks";

function useViewModel(props) {
  const tag = "Screens::Home";
  const nav = useNavigation(props);
  const {user} = useStores();

  // const [urlOpened, setUrlOpened] = useState(false);
  const go2Main = () => {
    if (user.accountType === 'Doctor') {
      nav.navigate(Screens.doctorFlow)
    } else {
      nav.navigate(Screens.userFlow);
    }
  };

  const onPressSignUp = () => {
    if (user.isValid) {
      go2Main();
    } else {
      nav.navigate(Screens.signUp)
    }
  };

  const onPressLogin = () => {
    if (user.isValid) {
      go2Main();
    } else {
      nav.navigate(Screens.logIn)
    }
  };

  const onPressSkipSignUp = async () => {
    // Linking.openURL('docitoo://d/5f6911799c06f46db319f23f');
    // DeepLinking.evaluateUrl('docitoo://d/5f6911799c06f46db319f23f');

    await user.logOut();
    nav.navigate(Screens.userFlow);
  };


  useEffect(() => {
    const handleUrl = ({url}) => {
      console.log(tag, 'handleUrl', url);
      // alert('handleUrl' + JSON.stringify(url));
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          // alert('handleUrl: Supported' + JSON.stringify(url));
          DeepLinking.evaluateUrl(url);
        }
      })
    };

    const init = async () => {

      DeepLinking.addScheme(`${AppConfig.linkScheme}`);
      DeepLinking.addRoute('/d/:id', (response) => {
        let temp = response.id.toString().split(`${AppConfig.linkScheme}d/`);
        // alert('ROUTE_ID' + temp[0]);
        console.log('ROUTE_ID', response.id);
      });

      try {
        Linking.addEventListener('url', handleUrl);

        let url = await Linking.getInitialURL();
        console.log(tag, url);
        if (url) {
          // alert('INITIAL_URL', url);
          // DeepLinking.evaluateUrl(url);
          Linking.openURL(url);
        }
      } catch (e) {
        console.log(tag, 'Exception', e.message);
        // alert(e.message);
      }
    };

    if (!nav.canGoBack()) {
      init();
    }

    return () => {
      Linking.removeEventListener('url', handleUrl)
    }

  }, []);

  return {
    user,
    onPressSignUp,
    onPressLogin,
    onPressSkipSignUp
  }
}

export default useViewModel;
