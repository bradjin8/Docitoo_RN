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
import Loading from "@/components/Loading";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as util from "@/utils/String";

const Notifications = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('notifications')} onSwipeUp={vm.fetchData}>
      {vm.data.isProcessing ?
        <Loading/>
        :
        <ScrollView style={styles.container}>
          <Space height={hp('1%')}/>
          {vm.notifications && vm.notifications.length && vm.notifications.sort().map((item, index) => {
            if (index < vm.notifications.length - 1) {
              return (
                <View key={index}>
                  <NotificationCard
                    notification={item}
                    key={index}
                    handleSwipeRight={() => {
                      console.log(`Notification ${item.id} will be removed soon`);
                      vm.setNotificationAsRead(item.id)
                    }}
                  />
                  <Separator color={Colors.grey} width={2}/>
                </View>
              );
            } else {
              return (
                <NotificationCard
                  notification={item}
                  key={index}
                  handleSwipeRight={() => {
                    console.log(`Notification ${item.id} will be removed soon`);
                    vm.setNotificationAsRead(item.id)
                  }}
                />
              )
            }
          })}
          {!vm.notifications || vm.notifications.length < 1 &&
          <Text style={styles.resultCount}>
            {util.formatInteger(vm.notifications.length) + ' ' + __('results_found')}
          </Text>
          }
          <Space height={hp('3%')}/>
        </ScrollView>
      }

    </BoardWithHeader>

  )
};

export const NotificationCard = ({notification, handleSwipeRight, handleSwipeDown}) => {
  const NotificationTypes = {
    REMINDER: 'REMINDER',
    SCHEDULE: 'SCHEDULE',
    ALERT: 'ALERT',
    ANNOUNCEMENT: 'ANNOUNCEMENT'
  };

  const renderContent = () => {
    if (notification.type === NotificationTypes.REMINDER) {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>{'This is a reminder for you to take your pill:'}</Text>
          <Text style={styles.notificationName}>{notification.content}</Text>
        </View>
      );
    } else if (notification.type === NotificationTypes.SCHEDULE) {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>
            {'You called a doctor to schedule an appointment '}
            <Text style={{fontWeight: 'bold'}}>{notification.content}</Text>
            {'. Time to book another one now.'}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>{notification.content}</Text>
        </View>
      )
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
      style={styles.notificationContainer}
      onSwipeUp={(state) => {
        if (handleSwipeDown)
          handleSwipeDown()
      }}
      onSwipeRight={(state) => {
        if (handleSwipeRight)
          handleSwipeRight()
      }}
      config={config}
    >
      <Image source={Images.notification[notification.type]} style={styles.notificationAvatar}/>
      {renderContent()}
    </GestureRecognizer>
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
  resultCount: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
});

export default observer(Notifications);
