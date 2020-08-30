import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {mockBloodTypes, mockUser} from '@/constants/MockUpData';
import {PermissionsAndroid, Platform} from "react-native";
import __ from "@/assets/lang";
import ImagePicker from "react-native-image-picker";

function useViewModel(props) {
  const tag = 'Screens::EditProfile::';
  const nav = useNavigation();

  const [user, setUser] = useState(mockUser);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [language, setLanguage] = useState('');

  let bloodTypes = [];

  mockBloodTypes.map(item => {
    bloodTypes.push({
      label: item,
      value: item,
    })
  });

  const onPressBack = () => {
    console.log(tag, 'onPressBack()');
    if (nav.canGoBack())
      nav.goBack();
  };

  const onPressAvatar = async () => {
    console.log(tag, 'onPressAvatar()');
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
      title: __('select_photo'),
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
        const source = {uri: response.uri};
        console.log(tag, 'User selected a photo: ', response.uri);

        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg:base64,' + response.data};

        setAvatarUrl(source);
      }
    })

  };

  const onPressUpdate = () => {
    console.log(tag, 'onPressUpdate()');

  };

  useEffect(() => {
    setUser(mockUser);
  }, []);

  return {
    user, setUser,
    avatarUrl, setAvatarUrl,
    fullName, setFullName,
    emailAddress, setEmailAddress,
    phoneNumber, setPhoneNumber,
    password, setPassword,
    gender, setGender,
    bloodType, setBloodType,
    language, setLanguage,
    bloodTypes,
    onPressBack,
    onPressAvatar,
    onPressUpdate,
  }
}

export default useViewModel;
