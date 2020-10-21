import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens, Screens} from '@/constants/Navigation';
import {useStores} from "@/hooks";
import ReactNativeAN from 'react-native-alarm-notification';
import __ from '@/assets/lang';

function useViewModel(props) {
  const tag = 'Screens::PillReminder';

  const nav = useNavigation(props);

  const [medicines, setMedicines] = useState([]);
  const {user, data} = useStores();

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()');
    nav.navigate(PillStackScreens.addPillReminder);
  };

  const handleDelete = (reminderId) => {
    data.deletePillReminder(reminderId);
  };

  useEffect(() => {
    const fetchData = async () => {
      await data.getPillReminders(user.sessionToken);
      console.log(tag, 'fetch reminders', data.getPills);
      if (data.lastStatus == "401") {
        nav.navigate(Screens.logIn);
        alert(__('session_expired'));
        user.logOut();
        return;
      }
      setMedicines(data.getPills);
    };
    fetchData();
  }, []);

  return {
    medicines,
    data,
    onPressAdd,
    handleDelete
  }
}

export default useViewModel;
