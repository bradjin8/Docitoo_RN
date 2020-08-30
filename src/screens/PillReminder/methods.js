import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens} from '@/constants/Navigation';
import {mockMedicines} from '@/constants/MockUpData';

function useViewModel(props) {
  const tag = 'Screens::PillReminder::';

  const nav = useNavigation();

  const [medicines, setMedicines] = useState(mockMedicines);

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()');
    nav.navigate(PillStackScreens.addPillReminder);
  };

  return {
    medicines,
    onPressAdd
  }
}

export default useViewModel;
