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
import SwipeListView from 'react-native-swipe-list-view';
import * as util from "@/utils/String";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from "react-native-swipeable";

const Notifications = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('notifications')} onSwipeUp={vm.fetchData}>
      {vm.data.isProcessing ?
        <Loading/>
        :
        <ScrollView style={styles.container}>
          <Space height={hp('2%')}/>
          {vm.notifications && vm.notifications.length ? vm.notifications.map((item, index) => (
              <View>
                <NotificationCard
                  notification={item}
                  key={index}
                  handleSwipeRight={() => {
                    console.log(`Notification ${item.id} will be removed soon`);
                    vm.setNotificationAsRead(item.id)
                  }}
                />
                <Separator color={Colors.grey} width={1} percent={90}/>
              </View>)
            )
            :
            <Text style={styles.resultCount}>
              {'0 ' + __('results_found')}
            </Text>
          }
          <Space height={hp('3%')}/>
        </ScrollView>
      }

    </BoardWithHeader>

  )
};

export const NotificationCard = ({notification, handleSwipeRight}) => {
  const NotificationTypes = {
    REMINDER: 'REMINDER',
    SCHEDULE: 'SCHEDULE',
    ALERT: 'ALERT',
    ANNOUNCEMENT: 'ANNOUNCEMENT'
  };
  const leftContent = <Text>Pull to activate</Text>;
  const rightButtons = [
    <TouchableHighlight
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: wp('30%')
      }}
      onPress={handleSwipeRight}
    >
      <MaterialCommunityIcon name={'delete'} color={'white'} size={20}/>
    </TouchableHighlight>
  ];


  const renderContent = () => {
    if (notification.type === NotificationTypes.REMINDER) {
      return (

        <View style={styles.notificationDesc}>
          {/*<Text style={styles.notificationDescText}>{'This is a reminder for you to take your pill:'}</Text>*/}
          <Text style={styles.notificationName}>{notification.content}</Text>
        </View>

      );
    } else if (notification.type === NotificationTypes.SCHEDULE) {
      return (
        <View style={styles.notificationDesc}>
          <Text style={styles.notificationDescText}>
            {/*{'You called a doctor to schedule an appointment '}*/}
            <Text style={{fontWeight: 'bold'}}>{notification.content}</Text>
            {/*{'. Time to book another one now.'}*/}
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

  return (
    <Swipeable
      leftContent={leftContent}
      rightButtons={rightButtons}
      leftButtonWidth={wp('30%')}
      rightButtonWidth={wp('30%')}
      onRightActionRelease={handleSwipeRight}
    >
      <View style={styles.notificationContainer}>
        <Image source={Images.notification[notification.type]} style={styles.notificationAvatar}/>
        {renderContent()}
      </View>
    </Swipeable>
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
    paddingHorizontal: wp('0%'),
    flexDirection: 'row',
    marginVertical: hp('1.5%'),
    alignContent: 'center',
    alignItems: 'center'
  },
  notificationAvatar: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: hp('4% '),
  },
  notificationDesc: {
    flexDirection: 'column',
    marginLeft: wp('4%'),
    justifyContent: 'space-evenly',
    width: wp('70%')
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
