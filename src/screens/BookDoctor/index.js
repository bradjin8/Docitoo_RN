import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, Button, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import * as StringUtil from '@/utils/String';
import DoctorList, {DoctorCard} from '@/components/List/DoctorList';
import Separator from "@/components/Separator";
import ScrollBoardWithHeaderLBButton from "@/components/Panel/ScrollBoardWithHeaderLRButton";
import CalendarPicker from 'react-native-calendar-picker';

const PickADate = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      {vm.doctor &&
      <ScrollBoardWithHeaderLBButton lButtonCaption={vm.title} rButtonCaption={__('')}
                                     onPressLeftButton={vm.onPressBack}
                                     onPressRightButton={vm.onPressBack}>
        <DoctorCard doctor={vm.doctor}/>
        <Space height={20 * scale}/>
        <Separator color={Colors.grey}/>
        <Space height={50 * scale}/>

        {vm.mode === vm.MODE.DATE && <CalendarPicker
          previousTitle={'<'}
          nextTitle={'>'}
          startFromMonday={true}
          selectedDayColor={Colors.blue1}
          selectedDayTextColor={Colors.white2}
          textStyle={{
            fontSize: 18 * scale
          }}
          // scrollable={true}
          minDate={new Date()}
          onDateChange={(date) => {
            vm.setDate(date)
          }}
        />}

        {vm.mode === vm.MODE.TIME && vm.timeSlots && <View style={styles.timeSlotsContainer}>
          {Object.keys(vm.timeSlots).sort().map((key) => {
            return (<TimeSlot slot={vm.timeSlots[key]} onPress={vm.selectTimeSlot} key={key}/>)
          })}
        </View>}
        <Space height={200 * scale}/>
      </ScrollBoardWithHeaderLBButton>}
      <View style={{
        backgroundColor: Colors.white2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '10%',
        margin: 0,
        elevation: 10,
        shadowColor: Colors.grey_dark,
        shadowRadius: 10,
        shadowOpacity: 0.75,
      }}>
        <View style={{
          marginHorizontal: '5%', width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%'
        }}>
          <TouchableHighlight style={styles.blueButton} onPress={vm.onPressConfirm} underlayColor={Colors.white2}>
            <Text style={styles.blueButtonLabel}>
              {vm.confirmCaption}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Container>
  )
};

export const TimeSlot = ({slot, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.timeSlot}
      onPress={() => {
        if (slot.available === true)
          onPress(slot.hour)
      }}
    >
      <Text style={slot.available ? slot.selected ? styles.timeSlotTextSelected : styles.timeSlotText : styles.timeSlotTextDisabled}>
        {slot.label}
      </Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  boldLabel: {
    fontSize: 18 * scale,
    fontWeight: 'bold',
    marginVertical: 10 * scale
  },
  blueButtonLabel: {
    color: Colors.white2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18 * scale,
  },
  blueButton: {
    backgroundColor: Colors.blue1,
    width: '100%',
    padding: 18 * scale,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.blue2,
    alignContent: 'center',
  },
  timeSlotsContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center'
  },
  timeSlot: {
    marginVertical: 10 * scale,
  },
  timeSlotText: {
    borderColor: Colors.blue1,
    color: Colors.blue1,
    width: 140 * scale,
    height: 50 * scale,
    borderRadius: 25 * scale,
    borderWidth: 0.5,
    fontSize: 18 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 14 * scale,
    alignItems: 'center',
  },
  timeSlotTextSelected: {
    color: Colors.turquoise_light,
    width: 140 * scale,
    height: 50 * scale,
    borderColor: Colors.blue5,
    borderRadius: 25 * scale,
    borderWidth: 0.5,
    fontSize: 18 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 14 * scale,
    alignItems: 'center',
  },
  timeSlotTextDisabled: {
    borderColor: Colors.grey,
    color: Colors.grey,
    width: 140 * scale,
    height: 50 * scale,
    borderRadius: 25 * scale,
    borderWidth: 0.5,
    fontSize: 18 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 14 * scale,
    alignItems: 'center',
  }
});

export default observer(PickADate);
