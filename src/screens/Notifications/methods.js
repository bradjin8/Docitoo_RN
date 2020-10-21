import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens, PillStackScreens} from '@/constants/Navigation';
import {mockNotifications} from '@/constants/MockUpData';
import {useStores} from "@/hooks";
import __ from '@/assets/lang';


function useViewModel(props) {
  const tag = 'Screens::Notification';

  const nav = useNavigation(props);

  const [notifications, setNotifications] = useState();
  const {user, data} = useStores();

  const NotificationTypes = {
    REMINDER: 'REMINDER',
    SCHEDULE: 'SCHEDULE',
    ALERT: 'ALERT',
    ANNOUNCEMENT: 'ANNOUNCEMENT'
  };

  const fetchData = async () => {
    await data.getNotifications(user.sessionToken);
    console.log(tag, 'fetch notifications', data);
    if (data.lastStatus == "401") {
      alert(__('session_expired'));
      user.logOut();
      nav.navigate(Screens.logIn);
      return;
    }
    setNotifications(data.notifications.slice());
  };

  const setNotificationAsRead = async (notificationId) => {
    await data.setNotificationAsRead(user.sessionToken, notificationId);
    // await fetchData();
  };

  useEffect(() => {
    setNotifications(data.notifications.slice())
  }, [data.notifications]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    fetchData,
    notifications,
    NotificationTypes,
    setNotificationAsRead,
  }
}

export default useViewModel;
