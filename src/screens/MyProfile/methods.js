import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {MoreStackScreens, Screens} from '@/constants/Navigation';
import {mockUser} from '@/constants/MockUpData';

function useViewModel(props) {
  const tag = 'Screens::MyProfile::';

  const nav = useNavigation();

  const [user, setUser] = useState(mockUser);

  const onPressEdit = () => {
    console.log(tag, 'onPressEdit()');
    nav.navigate(MoreStackScreens.editProfile)
  };

  return {
    user,
    onPressEdit
  }
}

export default useViewModel;
