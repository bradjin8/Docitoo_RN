import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens} from "@/constants/Navigation";

function useViewModel(props) {
  const tag = 'Screens::AddPillReminder::';
  const nav = useNavigation();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');

  const onPressBack = () => {
    console.log(tag, 'onPressBack()');
    if (nav.canGoBack())
      nav.goBack();
  };

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()', name, dosage, frequency, time);
    nav.navigate(PillStackScreens.pillReminder);
  };

  return {
    name, setName,
    dosage, setDosage,
    frequency, setFrequency,
    time, setTime,
    onPressBack,
    onPressAdd,
  }
}

export default useViewModel;
