import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeaderRightButton from '@/components/Panel/BoardWithHeaderRightButton';
import GreyInput from '@/components/Input/GreyInput';
import BlueButton from '@/components/Button/BlueButton';
import TransBlueButton from '@/components/Button/TransBlueButton';
import ImageButton from '@/components/Button/ImageButton';
import IconButton from '@/components/Button/IconButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import * as StringUtil from '@/utils/String';
import DoctorList from '@/components/List/DoctorList';

const styles = StyleSheet.create({
  resultCount: {
    fontWeight: 'bold',
    fontSize: 16 * scale
  },
  searchButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: '12%',
    right: 0,
  }
});

const Doctors = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeaderRightButton title={__('doctors')} buttonCaption={__('sort')} onPressRightButton={()=>{vm.onPressSort(vm.doctors)}}>
      <Text style={styles.resultCount}>
        {StringUtil.formatInteger(vm.totalDoctorCount)} results found
      </Text>
      <Space height={16 * scale} />
      <DoctorList doctors={vm.doctors}/>
      <ImageButton image={Images.button.search} onPress={vm.onPressSearch} style={styles.searchButton}/>
    </BoardWithHeaderRightButton>
  )
};

export default observer(Doctors);
