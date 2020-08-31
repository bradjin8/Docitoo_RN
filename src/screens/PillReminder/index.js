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

const PillReminder = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('pill_reminder')}>
      <ScrollView style={styles.container}>
        <Space height={20 * scale}/>
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

        <Space height={30 * scale}/>
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
  medicineContainer: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 10 * scale,
  },
  medicineAvatar: {
    width: 80 * scale,
    height: 80 * scale,
    borderRadius: 40 * scale,
  },
  medicineDesc: {
    flexDirection: 'column',
    marginLeft: 30 * scale,
    justifyContent: 'space-evenly',
  },
  medicineName: {
    fontWeight: 'bold',
    fontSize: 20 * scale,
  },
  medicineDescText: {
    fontSize: 18 * scale,
  },
  addButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: 104 * scale,
    right: 24 * scale,
  },
  addButtonImage: {
    width: 70 * scale,
    height: 70 * scale,
  }

});

export default observer(PillReminder);
