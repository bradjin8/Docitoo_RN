import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeaderRightButton from '@/components/Panel/BoardWithHeaderRightButton';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import * as StringUtil from '@/utils/String';
import DoctorList from '@/components/List/DoctorList';
import SearchDoctorsModal from './components/SearchDoctorsModal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import MapView from 'react-native-maps';
import Loading from '@/components/Loading';

const styles = StyleSheet.create({
  resultCount: {
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  searchButton: {
    zIndex: 30,
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
  },
  searchButtonImage: {
    width: wp('15%'),
    height: wp('15%'),
  }
});

const tag = 'Doctors::View';

const Doctors = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      {vm.data.isPrcessing || vm.isLoading ?
        <Loading/>
        :
        <BoardWithHeaderRightButton title={__('doctors')} buttonCaption={__('sort')} onPressRightButton={() => {
          vm.onPressSort(vm.doctors)
        }}>
          <Text style={styles.resultCount}>
            {StringUtil.formatInteger(vm.doctors.length) + ' ' + __('results_found')}
          </Text>
          <Space height={hp('1%')}/>
          <DoctorList doctors={vm.doctors} onPressDoctor={vm.onPressDoctor}/>

          {/*<MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -112.4324,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
          style={StyleSheet.absoluteFillObject}
        />*/}
        </BoardWithHeaderRightButton>

      }
      <ImageButton image={Images.button.search} onPress={vm.onPressSearch} style={styles.searchButton}
                   imageStyle={styles.searchButtonImage}/>
      <SearchDoctorsModal isVisible={vm.searchVisible} onPressClose={vm.onPressSearch} onPressOK={vm.applyFilter}/>
    </Container>
  )
};

export default observer(Doctors);
