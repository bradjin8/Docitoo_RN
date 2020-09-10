import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens} from '@/constants/Navigation';
import {mockMedicines} from '@/constants/MockUpData';
import {getPillReminders} from '@/Services/Api';

function useViewModel(props) {
  const tag = 'Screens::PillReminder::';

  const nav = useNavigation();

  const [medicines, setMedicines] = useState(mockMedicines);

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()');
    nav.navigate(PillStackScreens.addPillReminder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPillReminders();
      console.log(res);
    };
    fetchData();
  }, []);

  return {
    medicines,
    onPressAdd
  }
}

export default useViewModel;
