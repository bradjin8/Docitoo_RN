import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens} from "@/constants/Navigation";
import * as Api from '@/Services/Api';
import {useStores} from "@/hooks";
import {Alert} from 'react-native';

function useViewModel(props) {
  const tag = 'Screens::AddPillReminder';
  const nav = useNavigation();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');
  const {user, data} = useStores();

  const onPressBack = () => {
    console.log(tag, 'onPressBack()');
    if (nav.canGoBack())
      nav.goBack();
  };

  const onPressAdd = async () => {
    console.log(tag, 'onPressAdd()', name, dosage, frequency, time);
    try {
      await data.addPillReminder(user.sessionToken, name, dosage, frequency, time);
      nav.navigate(PillStackScreens.pillReminder);
    } catch (e) {
      Alert.alert(
        "Exception",
        e.message,
        [
          {
            text: 'OK',
            onPress: () => console.log(tag, 'onPressAdd', 'OK pressed')
          }
        ],
        {cancelable: false}
      );
    }
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
