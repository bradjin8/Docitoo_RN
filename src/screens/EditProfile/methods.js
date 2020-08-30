import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {mockUser} from '@/constants/MockUpData';

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

  const onPressBack = () => {
    console.log(tag, 'onPressBack()');
    if (nav.canGoBack())
      nav.goBack();
  };

  const onPressAvatar = () => {
    console.log(tag, 'onPressAvatar()');

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
    onPressBack,
    onPressAvatar,
    onPressUpdate,
  }
}

export default useViewModel;
