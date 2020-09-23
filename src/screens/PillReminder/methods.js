import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens, Screens} from '@/constants/Navigation';
import {mockMedicines} from '@/constants/MockUpData';
import {getPillReminders} from '@/Services/Api';
import {useStores} from "@/hooks";

function useViewModel(props) {
  const tag = 'Screens::PillReminder';

  const nav = useNavigation(props);

  const [medicines, setMedicines] = useState([]);
  const {user, data} = useStores();

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()');
    nav.navigate(PillStackScreens.addPillReminder);
  };

  useEffect(() => {
    const fetchData = async () => {
      await data.getPillReminders(user.sessionToken);
      console.log(tag, 'fetch reminders', data);
      if (data.lastStatus == "401") {
        alert('Session expired');
        user.logOut();
        return;
      }
      setMedicines(data.getPills);
    };
    fetchData();
  }, []);

  return {
    medicines,
    onPressAdd
  }
}

export default useViewModel;
