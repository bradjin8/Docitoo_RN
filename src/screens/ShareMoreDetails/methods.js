import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '@/constants/Navigation';

function useViewModel(props) {
  const nav = useNavigation();

  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');

  const onPressSubmit = () => {
    nav.navigate(Screens.signUp)
  };

  const onPressChoose = () => {
  };

  return {
    gender, setGender,
    bloodType, setBloodType,
    onPressSubmit,
    onPressChoose,
  }
}

export default useViewModel;
