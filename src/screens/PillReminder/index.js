import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import Container from '@/components/Container';
import {scale} from '@/styles/Sizes';
import Colors from "@/styles/Colors";
import Images from '@/styles/Images';
import Separator from "@/components/Separator";
import useViewModel from './methods';
import ImageButton from "@/components/Button/ImageButton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import * as util from '@/utils/String';
import Loading from "@/components/Loading";
import dateFormat from 'node-datetime';
import Swipeable from 'react-native-swipeable';
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {useStores} from "../../hooks";

const PillReminder = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BoardWithHeader title={__('pill_reminder', vm.user.language)}>
        {vm.data.isProcessing ?
          <Loading/>
          :
          <ScrollView style={styles.container}>
            <Space height={hp('2%')}/>
            {vm.data.pillReminders.slice().sort().map((item, index) => {
              if (index < vm.medicines.length - 1) {
                return (
                  <View key={index}>
                    <MedicineCard medicine={item} key={index} type={index % 4}
                                  handleDelete={() => vm.handleDelete(item.id)}
                    />
                    <Separator color={Colors.grey}/>
                  </View>
                );
              } else {
                return (
                  <MedicineCard medicine={item} key={index} type={index % 4}
                                handleDelete={() => vm.handleDelete(item.id)}
                  />
                )
              }
            })}
            {vm.data.pillReminders.length < 1 &&
            <Text style={styles.resultCount}>
              {util.formatInteger(vm.medicines.length) + ' ' + __('results_found', vm.user.language)}
            </Text>
            }
            <Space height={hp('3%')}/>
          </ScrollView>
        }
      </BoardWithHeader>
      <ImageButton image={Images.button.add_medicine} onPress={vm.onPressAdd} style={styles.addButton}
                   imageStyle={styles.addButtonImage}/>
    </Container>
  )
};

export const MedicineCard = ({medicine, type, handleDelete}) => {
  const leftContent = <Text>Pull to activate</Text>;
  const {user} = useStores();

  const rightButtons = [
    <TouchableHighlight
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: wp('30%')
      }}
      onPress={handleDelete}
    >
      <MaterialCommunityIcon name={'delete'} color={'white'} size={20}/>
    </TouchableHighlight>
  ];

  return (
    <Swipeable
      leftContent={leftContent}
      rightButtons={rightButtons}
      leftButtonWidth={wp('30%')}
      rightButtonWidth={wp('30%')}
      // onLeftActionActivate={handleDelete}
    >
      <View style={styles.medicineContainer}>
        <Image source={Images.medicines[type]} style={styles.medicineAvatar}/>
        <View style={styles.medicineDesc}>
          <Text style={styles.medicineName}>{medicine.medicineName + ' - ' + medicine.dosage}</Text>
          <Text
            style={styles.medicineDescText}>{medicine.frequency + ' ' + __('pill_at', user.language) + ' ' + dateFormat.create(parseInt(medicine.timeToTake)).format('I:M p')}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    flexDirection: 'column',
    height: hp('92%'),
    // backgroundColor: '#666',
  },
  medicineContainer: {
    width: wp('100%'),
    flexDirection: 'row',
    marginVertical: hp('1.2%'),
  },
  medicineAvatar: {
    width: hp('8%'),
    height: hp('8%'),
    borderRadius: hp('4%'),
  },
  medicineDesc: {
    flexDirection: 'column',
    marginLeft: hp('3%'),
    justifyContent: 'space-evenly',
  },
  medicineName: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  medicineDescText: {
    fontSize: hp('1.8%'),
  },
  addButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
  },
  addButtonImage: {
    width: wp('15%'),
    height: wp('15%'),
  },
  resultCount: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
});

export default observer(PillReminder);
