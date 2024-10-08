import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';
import ImagePicker from 'react-native-image-picker';
import __ from '@/assets/lang';
import {Platform, PermissionsAndroid} from 'react-native';
import {mockBloodTypes} from '@/constants/MockUpData';
import {useStores} from "@/hooks";
import AppConfig from "@/config/AppConfig";
import axios from 'axios';

function useViewModel(props) {
  const nav = useNavigation(props);
  const tag = 'Screens::ShareMoreDetails';

  let bloodTypes = [];

  mockBloodTypes.map(item => {
    bloodTypes.push({
      label: item,
      value: item,
    })
  });

  const {user} = useStores();
  const [gender, setGender] = useState(user.gender);
  const [bloodType, setBloodType] = useState(user.bloodType);
  const [avatarSource, setAvatarSource] = useState(null);

  const onPressSubmit = async () => {
    try {
      let avatarData = null;
      if (avatarSource) {
        avatarData = 'data:image/jpeg;base64,' + avatarSource.data
      }
      console.log(gender, bloodType);
      await user.shareMoreDetails(gender, bloodType, avatarData);
      if (user.statusCode == '401') {
        await user.logOut();
        nav.navigate(Screens.logIn);
      }
      // console.log(data);
      nav.navigate(Screens.userFlow)
    } catch (e) {
      console.log(tag, 'OnPressSubmit, Ex', e.message)
    }
  };

  const onPressChoose = async () => {
    const tag = 'ShareMoreDetails::onPressChoose()';

    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);

        const cameraGrant = grants[PermissionsAndroid.PERMISSIONS.CAMERA];
        if (cameraGrant === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(tag, 'You can use camera')
        } else {
          console.log(tag, 'Camera permission denied')
        }

        const storageGrant = grants[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
        if (storageGrant === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use store photos and videos')
        } else {
          console.log('Storage permission denied')
        }

      } catch (e) {
        console.log(tag, 'error', e.message)
      }
    }
    const options = {
      title: __('select_photo', user.language),
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log(tag, 'User cancelled image picker');
      } else if (response.error) {
        console.log(tag, 'ImagePicker error: ', response.error);
      } else if (response.customButton) {
        console.log(tag, 'User tapped custom button: ', response.customButton);
      } else {
        const source = {response};
        console.log(tag, 'User selected a photo: ', response);

        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg:base64,' + response.data};
        console.log(response.uri);
        setAvatarSource(response);
      }
    })
  };

  useEffect(() => {
    if (user.avatarUrl) {
      setAvatarSource({uri: user.avatarUrl})
    }
  }, []);

  return {
    bloodTypes,
    gender, setGender,
    bloodType, setBloodType,
    avatarSource, setAvatarSource,
    user,
    onPressSubmit,
    onPressChoose,
  }
}

export default useViewModel;
