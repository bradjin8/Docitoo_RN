import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PillStackScreens} from '@/constants/Navigation';
import {mockNotifications} from '@/constants/MockUpData';

function useViewModel(props) {
  const tag = 'Screens::PillReminder::';

  const nav = useNavigation();

  const [notifications, setNotifications] = useState(mockNotifications);
  const NotificationTypes = {
    PILL: 'pill',
    SCHEDULE: 'schedule',
    ANNOUNCEMENT: 'announcement'
  };

  const onPressAdd = () => {
    console.log(tag, 'onPressAdd()');
    nav.navigate(PillStackScreens.addPillReminder);
  };

  return {
    notifications,
    NotificationTypes,
    onPressAdd
  }
}

export default useViewModel;
