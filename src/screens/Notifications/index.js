import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import Colors from "@/styles/Colors";
import Images from '@/styles/Images';
import Separator from "@/components/Separator";
import useViewModel from './methods';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const Notifications = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('notifications')}>
      <ScrollView style={styles.container}>
        <Space height={hp('1%')}/>
        {vm.notifications.sort().map((item, index) => {
          if (index < vm.notifications.length - 1) {
            return (
              <View key={index}>
                <NotificationCard notification={item} key={index}/>
                <Separator color={Colors.grey} width={2}/>
              </View>
            );
          } else {
            return (
              <NotificationCard notification={item} key={index}/>
            )
          }
        })}

        <Space height={hp('3%')}/>
      </ScrollView>
    </BoardWithHeader>

  )
};

export const NotificationCard = ({notification}) => {
  const NotificationTypes = {
    PILL: 'pill',
    SCHEDULE: 'schedule',
    ANNOUNCEMENT: 'announcement'
  };

  const renderContent = () => {
    if (notification.type === NotificationTypes.PILL) {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>{'This is a reminder for you to take your pill:'}</Text>
          <Text style={styles.notificationName}>{notification.content}</Text>
        </View>
      );
    }
    else if (notification.type === NotificationTypes.SCHEDULE) {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>
            {'You called a doctor to schedule an appointment '}
            <Text style={{fontWeight: 'bold'}}>{notification.content}</Text>
            {'. Time to book another one now.'}
          </Text>
        </View>
      )
    }
    else if (notification.type === NotificationTypes.ANNOUNCEMENT) {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>{notification.content}</Text>
        </View>
      )
    }
  };

  return (
    <View style={styles.notificationContainer}>
      <Image source={Images.notification[notification.type]} style={styles.notificationAvatar}/>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    flexDirection: 'column',
    height: hp('100%'),
    // backgroundColor: '#666',
  },
  notificationContainer: {
    width: wp('100%'),
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
  },
  notificationAvatar: {
    width: hp('8%'),
    height: hp('8%'),
    borderRadius: hp('4% '),
  },
  notificationDesc: {
    flexDirection: 'column',
    marginLeft: wp('4%'),
    justifyContent: 'space-evenly',
    width: wp('76%')
  },
  notificationName: {
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  notificationDescText: {
    fontSize: hp('1.7%'),
    lineHeight: hp('2.8%'),
  },
});

export default observer(Notifications);
