import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens} from '@/constants/Navigation';
import {mockMedicines} from '@/constants/MockUpData';
import {getPillReminders} from '@/Services/Api';
import {useStores} from "@/hooks";

function useViewModel(props) {
  const tag = 'Screens::PillReminder::';

  const nav = useNavigation();

  const [medicines, setMedicines] = useState(mockMedicines);
  const {user} = useStores();

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()');
    nav.navigate(PillStackScreens.addPillReminder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPillReminders(user.sessionToken);
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
