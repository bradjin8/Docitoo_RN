import React from 'react';
import Container from '@/components/Container';
import {View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {observer} from 'mobx-react';
import Space from '@/components/Space';
import GreyInput from '@/components/Input/GreyInput';
import __ from "@/assets/lang";
import ScrollBoardWithHeaderLBButton from "@/components/Panel/ScrollBoardWithHeaderLRButton";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from "@/styles/Colors";
import Images from '@/styles/Images';
import useViewModel from './methods';
import BlueButton from "@/components/Button/BlueButton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import dateFormat from 'node-datetime';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

const AddPillReminder = (props) => {
  const vm = useViewModel(props);
  let timeSlots = [];
  for (let i = 0; i <= 23; i++) {

    // morning, afternoon, evening, night
    // ref : https://www.speld-sa.org.au/images/Maths/12_and_24_Hour_Time_Chart.pdf
    let image = Images.time.evening;
    if (i >= 21 || i <= 4) {
      image = Images.time.night;
    } else if (i >= 5 && i <= 11) {
      image = Images.time.morning;
    } else if (i >= 12 && i <= 17) {
      image = Images.time.afternoon;
    }

    let AMPM = 'AM';
    let hour = i;

    if (i >= 12) {
      AMPM = 'PM';
      hour = i - 12;
    }

    if (hour === 0) {
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

  console.log(vm.dateTime);

  return (
    <Container>
      <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('')}
                                     onPressLeftButton={vm.onPressBack}
                                     onPressRightButton={vm.onPressBack}>
        <Space height={hp('3%')}/>
        <Text style={styles.note}>{__('add_the_relevant_details_below')} </Text>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <GreyInput placeholder={__('medicine_name')} value={vm.name} onChangeText={(val) => vm.setName(val)}/>
          <GreyInput placeholder={__('dosage')} value={vm.dosage}
                     onChangeText={(val) => vm.setDosage(val)}/>
          <GreyInput placeholder={__('frequency')} value={vm.frequency}
                     onChangeText={(val) => vm.setFrequency(val)}/>

          {Platform.OS === 'ios' ? <DatePicker
              style={{width: wp('90%')}}
              date={vm.dateTime}
              placeholder={'Select a time'}
              mode={'time'}
              androidMode={'spinner'}
              confirmBtnText={'OK'}
              cancelBtnText={'Cancel'}
              onDateChange={(val) => {
                let dateTime = new Date(vm.dateTime);
                const hour = parseInt(val.split(':')[0]);
                const min = parseInt(val.split(':')[1]);
                console.log(hour, min);
                dateTime.setHours(hour);
                dateTime.setMinutes(min);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);

                vm.setDateTime(dateTime);
              }}
            />
            :
            <>
              <TouchableOpacity
                onPress={
                  () => {
                    vm.setVisiblePicker(true)
                  }
                }
              >
                <Text style={{padding: hp('2%'), backgroundColor: Colors.grey_light, color: Colors.grey_dark}}>
                  {dateFormat.create(vm.dateTime).format('I:M p')}
                </Text>
              </TouchableOpacity>
              <View style={{width: '10%'}}>
                {vm.visiblePicker && <DateTimePicker
                  value={vm.dateTime}
                  display={"default"}
                  mode={"time"}
                  onChange={(event, selectedDate) => {
                    let currentDate = selectedDate || vm.dateTime;
                    currentDate.setSeconds(0);
                    currentDate.setMilliseconds(0);
                    vm.setVisiblePicker(Platform.OS === 'ios');
                    vm.setDateTime(currentDate);
                  }}
                />}
              </View>
            </>
          }

          {/*
            <DropDownPicker
              items={timeSlots}
              style={styles.dropDownBack}
              containerStyle={styles.dropDownContainer}
              itemStyle={styles.dropDownItem}
              dropDownStyle={styles.dropDown}
              labelStyle={styles.dropDownLabel}
              customArrowUp={({size, color}) => (
                <MaterialCommunityIcon size={hp('2.6%')} color={Colors.grey_dark} name={'clock-outline'}/>)}
              customArrowDown={({size, color}) => (
                <MaterialCommunityIcon size={hp('2.6%')} color={Colors.grey_dark} name={'clock-outline'}/>)}
              onChangeItem={item => vm.setTime(item.value)}
              placeholder={__('select_time_to_take_pill')}
              dropDownMaxHeight={hp('20%')}
            />
          </View>*/}
          <BlueButton onPress={vm.onPressAdd} caption={__('set_pill_reminder')}/>

          <Space height={hp('20%')}/>
        </KeyboardAvoidingView>


      </ScrollBoardWithHeaderLBButton>
    </Container>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    height: hp('6%'),
    marginVertical: hp('1%')
  },
  dropDownItem: {
    justifyContent: 'flex-start',
  },
  dropDownItemImage: {
    width: hp('4%'),
    height: hp('4%'),
  },
  dropDown: {
    backgroundColor: Colors.grey_light,
    borderWidth: 0,
  },
  dropDownBack: {
    borderWidth: 0,
    backgroundColor: Colors.grey_light,
  },
  dropDownLabel: {
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark,
    fontSize: hp('1.8%'),
  },
  note: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: hp('2%'),
    paddingVertical: hp('1%'),
  },

});

export default observer(AddPillReminder);


