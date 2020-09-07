import React from 'react';
import {View, Text, StyleSheet, Platform, Image, TouchableHighlight, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '@/styles/Colors';
import BackgroundImage from '@/components/BackgroundImage';
import Images from "@/styles/Images";
import Separator from "@/components/Separator";
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import __ from '@/assets/lang';
import IconButton from '@/components/Button/IconButton';
import WhiteInput from '@/components/Input/WhiteInput';
import SearchDoctorsModalMethods from './SearchDoctorsModalMethods';
import {observer} from 'mobx-react';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {mockSpecialities} from '@/constants/MockUpData';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

let mockSpecialityItems = [];
mockSpecialities.map(item => {
  mockSpecialityItems.push(
    {
      label: __(item.toString().toLowerCase()),
      value: item.toString()
    }
  );
});

const SearchDoctorsModal = (props) => {
  const vm = SearchDoctorsModalMethods(props);

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.container}
    >
      <BackgroundImage source={Images.background.search_doctor} resizeMdoe="cover"/>
      {Platform.OS === 'ios' && <Space height={hp('3.5%')}/>}
      <View style={styles.header}>
        <Text style={styles.title}>
          {__('search_doctors')}
        </Text>
        <TouchableOpacity onPress={props.onPressClose}>
          <MaterialCommunityIcon name={'window-close'} size={hp('3.5%')} color={Colors.white2}/>
        </TouchableOpacity>
      </View>
      <Separator color={Colors.grey_light}/>
      <KeyboardAvoidingView behavior={"padding"} style={styles.body}>
        <WhiteLabel text={__('search_by_name')}/>
        <WhiteInput placeholder={__('doctors_name')} value={vm.doctorName}
                    onChangeText={(value) => vm.setDoctorName(value)}/>
        <WhiteLabel text={__('speciality')}/>
        <DropDownPicker
          items={mockSpecialityItems}
          style={styles.dropDownBack}
          containerStyle={styles.dropDownContainer}
          itemStyle={styles.dropDownItem}
          dropDownStyle={styles.dropDown}
          labelStyle={styles.dropDownLabel}
          arrowStyle={styles.dropDownArrow}
          onChangeItem={item => vm.setSpeciality(item.value)}
          placeholder={__('select_speciality')}
          arrowColor={'#fff'}
          customArrowUp={({size, color}) => (<Icon size={hp('2.5%')} color={'#fff'} name={'caret-up'}/>)}
          customArrowDown={({size, color}) => (<Icon size={hp('2.5%')} color={'#fff'} name={'caret-down'}/>)}
          value={vm.speciality}
          defaultValue={vm.speciality}
        />

        <WhiteLabel text={__('location')}/>
        <WhiteInput placeholder={__('browse_location')}/>
        <Space height={hp('5%')}/>
        <View style={styles.logoContainer}>
          <Image source={Images.logo.grey} style={styles.logo} resizeMode={'cover'}/>
        </View>
        <TouchableHighlight style={styles.whiteButton} onPress={vm.onPressFilterResults}>
          <Text style={styles.buttonLabel}>
            {__('filter_result')}
          </Text>
        </TouchableHighlight>

      </KeyboardAvoidingView>
    </Modal>
  );
};

const WhiteLabel = ({text}) => {
  return (
    <Text style={styles.label}>
      {text}
    </Text>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: hp('2%'),
    alignItems: 'center'
  },
  title: {
    color: Colors.white2,
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
  body: {
    margin: '5%',
    height: hp('82%'),
    // backgroundColor: '#222'
  },
  label: {
    color: Colors.white2,
    fontSize: hp('2%'),
    marginTop: hp('1.2%'),
    marginBottom: hp('1%'),
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: hp('18%'),
    height: hp('20%'),
  },
  whiteButton: {
    backgroundColor: '#fff',
    width: '100%',
    padding: hp('2.6%'),
    margin: 0,
    borderRadius: wp('1.5%'),
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  dropDownContainer: {
    height: hp('6%'),
    marginVertical: hp('1%')
  },
  dropDownItem: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: '#6ac6ed',
    color: Colors.grey_dark,
    borderWidth: 1,
  },
  dropDownBack: {
    borderWidth: 0,
    backgroundColor: '#6ac6ed',
    color: Colors.grey_dark
  },
  dropDownLabel: {
    backgroundColor: '#6ac6ed',
    color: Colors.white2,
    fontSize: hp('2%'),
    paddingHorizontal: wp('0%')
  },
  dropDownArrow: {
    // color: '#fff'
  }
});

export default observer(SearchDoctorsModal);
