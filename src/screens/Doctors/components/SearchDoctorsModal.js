import React from 'react';
import {View, Text, StyleSheet, Platform, Image, TouchableHighlight} from 'react-native';
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
import {mockSpecialities} from '@/constants/MockUpData';

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
      {Platform.OS === 'ios' && <Space height={30}/>}
      <View style={styles.header}>
        <Text style={styles.title}>
          {__('search_doctors')}
        </Text>
        <IconButton color={Colors.white2} onPress={props.onPressClose} name={'window-close'} size={30 * scale}/>
      </View>
      <Separator color={Colors.grey_light}/>
      <View style={styles.body}>
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
          customArrowUp={({size, color}) => (<Icon size={20} color={'#fff'} name={'caret-up'}/>)}
          customArrowDown={({size, color}) => (<Icon size={20} color={'#fff'} name={'caret-down'}/>)}
          value={vm.speciality}
          defaultValue={vm.speciality}
        />

        <WhiteLabel text={__('location')}/>
        <WhiteInput placeholder={__('browse_location')}/>
        <Space height={40 * scale}/>
        <View style={styles.logoContainer}>
          <Image source={Images.logo.grey} style={styles.logo} resizeMode={'cover'}/>
        </View>
        <TouchableHighlight style={styles.whiteButton} onPress={vm.onPressFilterResults}>
          <Text style={styles.buttonLabel}>
            {__('filter_result')}
          </Text>
        </TouchableHighlight>

      </View>
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
    padding: 20 * scale,
    alignItems: 'center'
  },
  title: {
    color: Colors.white2,
    fontSize: 20 * scale,
    fontWeight: 'bold',
  },
  body: {
    margin: '5%',
    height: '82%',
    // backgroundColor: '#222'
  },
  label: {
    color: Colors.white2,
    fontSize: 20 * scale,
    marginTop: 12 * scale,
    marginBottom: 8 * scale,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 180 * scale,
    height: 200 * scale,
  },
  whiteButton: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 24 * scale,
    margin: 0,
    borderRadius: 5,
    alignContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20 * scale,
  },
  dropDownContainer: {
    height: 60 * scale,
    marginVertical: 10 * scale
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
    fontSize: 18 * scale
  },
  dropDownArrow: {
    // color: '#fff'
  }
});

export default observer(SearchDoctorsModal);
