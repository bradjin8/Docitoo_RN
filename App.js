/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import useStores from '@/hooks';
import {
  StatusBar, SafeAreaView, StyleSheet
} from 'react-native';
import Route from '@/Route';
import StoreProvider from '@/mst/StoreProvider';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();

import OneSignal from 'react-native-onesignal';
import Config from "@/config/AppConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const App: () => React$Node = () => {
  const tag = 'App::';
  // const {user} = useStores();

  // Remove this method to stop OneSignal Debugging
  OneSignal.setLogLevel(6, 0);

  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init(Config.oneSignalAppID, {kOSSettingsKeyAutoPrompt: false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption: 2});
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.


  const myiOSPromptCallback = (permission) => {
    // do something with permission value
  };

  const onReceived = (notification) => {
    console.log(tag, 'Notification Received:', notification)
  };

  const onOpened = (openResult) => {
    console.log(tag, 'Message: ', openResult.notification.payload.body);
    console.log(tag, 'Data: ', openResult.notification.payload.additionalData);
    console.log(tag, 'isActive: ', openResult.notification.isAppInFocus);
    console.log(tag, 'openResult: ', openResult);
  };

  const onIds = async (device) => {
    console.log(tag, 'Device Info:', device);
    const {pushToken, userId} = device;
    try {
      await AsyncStorage.setItem(Config.oneSignalUserIDStorageKey, userId);
    } catch (e) {

    }
  };

  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);

  useEffect(() => {
    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    }
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      {/*<SafeAreaView style={styles.container}>*/}
        <StoreProvider>
          <Route/>
        </StoreProvider>
      {/*</SafeAreaView>*/}
    </>
  );
};


export default App;
