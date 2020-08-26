import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeaderRightButton from '@/components/Panel/BoardWithHeaderRightButton';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';
import * as StringUtil from '@/utils/String';
import DoctorList from '@/components/List/DoctorList';
import SearchDoctorsModal from './components/SearchDoctorsModal';

const styles = StyleSheet.create({
  resultCount: {
    fontWeight: 'bold',
    fontSize: 16 * scale
  },
  searchButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: '10%',
    right: 0,
  }
});

const Doctors = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BoardWithHeaderRightButton title={__('doctors')} buttonCaption={__('sort')} onPressRightButton={() => {
        vm.onPressSort(vm.doctors)
      }}>
        <Text style={styles.resultCount}>
          {StringUtil.formatInteger(vm.totalDoctorCount)} results found
        </Text>
        <Space height={16 * scale}/>
        <DoctorList doctors={vm.doctors}/>
        <ImageButton image={Images.button.search} onPress={vm.onPressSearch} style={styles.searchButton}/>
      </BoardWithHeaderRightButton>
      <SearchDoctorsModal isVisible={vm.searchVisible} onPressClose={vm.onPressSearch} onPressOK={vm.applyFilter}/>
    </Container>
  )
};

export default observer(Doctors);
