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

const Notifications = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('pill_reminder')}>
      <ScrollView style={styles.container}>
        <Space height={10 * scale}/>
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

        <Space height={30 * scale}/>
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
    width: '90%',
    flexDirection: 'column',
    height: '92%',
    // backgroundColor: '#666',
  },
  whiteButtonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18 * scale,
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.blue1,
    alignContent: 'center',
  },
  notificationContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 15 * scale,
  },
  notificationAvatar: {
    width: 80 * scale,
    height: 80 * scale,
    borderRadius: 40 * scale,
  },
  notificationDesc: {
    flexDirection: 'column',
    marginLeft: 16 * scale,
    justifyContent: 'space-evenly',
    width: '76%'
  },
  notificationName: {
    fontWeight: 'bold',
    fontSize: 16 * scale,
  },
  notificationDescText: {
    fontSize: 16 * scale,
    lineHeight: 30 * scale,
  },
  addButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: '10%',
    right: 0,
  }

});

export default observer(Notifications);
