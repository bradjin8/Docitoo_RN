import React from 'react';
import Container from '@/components/Container';
import {View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {observer} from 'mobx-react';
import Space from '@/components/Space';
import GreyInput from '@/components/Input/GreyInput';
import __ from "@/assets/lang";
import ScrollBoardWithHeaderLBButton from "@/components/Panel/ScrollBoardWithHeaderLRButton";
import {scale} from "@/styles/Sizes";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from "@/styles/Colors";
import Images from '@/styles/Images';
import useViewModel from './methods';
import BlueButton from "@/components/Button/BlueButton";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddPillReminder = (props) => {
  const vm = useViewModel(props);
  let timeSlots = [];
  for (let i = 0; i <= 23; i++) {
    let image = Images.time.evening;
    // evening
    if (i > 21 && i <= 4) {
      image = Images.time.night;
    } else if (i > 5 && i <= 12) {
      image = Images.time.morning;
    } else if (i > 12 && i <= 18) {
      image = Images.time.afternoon;
    }

    let AMPM = 'AM';
    if (i >= 12) {
      AMPM = 'PM';
    }

    let hour = i;
    if (i === 0) {
      hour = 12;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    timeSlots.push({
        label: hour + ' ' + AMPM,
        value: i,
        icon: () => <Image source={image} style={styles.dropDownItemImage}/>
      }
    )
  }


  return (
    <Container>
      <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('')}
                                     onPressLeftButton={vm.onPressBack}
                                     onPressRightButton={vm.onPressBack}>
        <Space height={30 * scale}/>
        <Text style={styles.note}>{__('add_the_relevant_details_below')} </Text>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <GreyInput placeholder={__('medicine_name')} value={vm.name} onChangeText={(val) => vm.setName(val)}/>
          <GreyInput placeholder={__('dosage')} value={vm.dosage}
                     onChangeText={(val) => vm.setDosage(val)}/>
          <GreyInput placeholder={__('frequency')} value={vm.frequency}
                     onChangeText={(val) => vm.setFrequency(val)}/>
          <View style={{width: '100%', ...(Platform.OS !== 'android' && {zIndex: 50})}}>
            <DropDownPicker
              items={timeSlots}
              style={styles.dropDownBack}
              containerStyle={styles.dropDownContainer}
              itemStyle={styles.dropDownItem}
              dropDownStyle={styles.dropDown}
              labelStyle={styles.dropDownLabel}
              customArrowUp={({size, color}) => (
                <MaterialCommunityIcon size={26} color={Colors.grey_dark} name={'clock-outline'}/>)}
              customArrowDown={({size, color}) => (
                <MaterialCommunityIcon size={26} color={Colors.grey_dark} name={'clock-outline'}/>)}
              onChangeItem={item => vm.setTime(item.value)}
              placeholder={__('select_time_to_take_pill')}
            />
          </View>
          <BlueButton onPress={vm.onPressAdd} caption={__('set_pill_reminder')}/>

          <Space height={200 * scale}/>
        </KeyboardAvoidingView>


      </ScrollBoardWithHeaderLBButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    height: 60 * scale,
    marginVertical: 10 * scale
  },
  dropDownItem: {
    justifyContent: 'flex-start',
  },
  dropDownItemImage: {
    width: 40 * scale,
    height: 40 * scale,
  },
  dropDown: {
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark,
    borderWidth: 0,
  },
  dropDownBack: {
    borderWidth: 0,
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark
  },
  dropDownLabel: {
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark,
    fontSize: 16 * scale
  },
  note: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20 * scale,
    paddingVertical: 10 * scale,
  },

});

export default observer(AddPillReminder);


