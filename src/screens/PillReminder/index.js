import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import Colors from "@/styles/Colors";
import Images from '@/styles/Images';
import Separator from "@/components/Separator";
import useViewModel from './methods';
import ImageButton from "@/components/Button/ImageButton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const PillReminder = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('pill_reminder')}>
      <ScrollView style={styles.container}>
        <Space height={hp('2%')}/>
        {vm.medicines.sort().map((item, index) => {
          if (index < vm.medicines.length - 1) {
            return (
              <View key={index}>
                <MedicineCard medicine={item} key={index} type={index % 4}/>
                <Separator color={Colors.grey}/>
              </View>
            );
          } else {
            return (
              <MedicineCard medicine={item} key={index} type={index % 4}/>
            )
          }
        })}

        <Space height={hp('3%')}/>
      </ScrollView>
      <ImageButton image={Images.button.add_medicine} onPress={vm.onPressAdd} style={styles.addButton} imageStyle={styles.addButtonImage}/>
    </BoardWithHeader>
  )
};

export const MedicineCard = ({medicine, type}) => {
  return (
    <View style={styles.medicineContainer}>
      <Image source={Images.medicines[type]} style={styles.medicineAvatar}/>
      <View style={styles.medicineDesc}>
        <Text style={styles.medicineName}>{medicine.name + ' - ' + medicine.dosage}</Text>
        <Text style={styles.medicineDescText}>{medicine.frequency + ' ' + __('pill_at') + ' ' + medicine.time}</Text>
      </View>
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
    bottom: hp('12%'),
    right: wp('5%'),
  },
  addButtonImage: {
    width: wp('15%'),
    height: wp('15%'),
  }

});

export default observer(PillReminder);
