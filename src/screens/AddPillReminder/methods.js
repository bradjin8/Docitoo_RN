import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useStores} from "@/hooks";
import {Alert} from 'react-native';

function useViewModel(props) {
  const tag = 'Screens::AddPillReminder';
  const nav = useNavigation();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [visiblePicker, setVisiblePicker] = useState(false);
  const {user, data} = useStores();


  const onPressBack = () => {
    console.log(tag, 'onPressBack()');
    if (nav.canGoBack())
      nav.goBack();
  };

  const onPressAdd = async () => {
    console.log(tag, 'onPressAdd()', name, dosage, frequency, dateTime.toLocaleString());

    if (!name || !dosage || !frequency) {
      alert('Input valid values');
      return;
    }
    try {
      await data.addPillReminder(user.sessionToken, name, dosage, frequency, dateTime);
      nav.goBack();
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
    dateTime, setDateTime,
    visiblePicker, setVisiblePicker,
    onPressBack,
    onPressAdd,
  }
}

export default useViewModel;
