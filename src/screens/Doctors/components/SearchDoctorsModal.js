import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '@/styles/Colors';
import BackgroundImage from '@/components/BackgroundImage';
import Images from "@/styles/Images";
import Separator from "@/components/Separator";
import Space from '@/components/Space';
import __ from '@/assets/lang';
import WhiteInput from '@/components/Input/WhiteInput';
import SearchDoctorsModalMethods from './SearchDoctorsModalMethods';
import {observer} from 'mobx-react';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import LocationView from 'react-native-location-view';
import Config from '@/config/AppConfig';
import GreyText from "@/components/Text/GreyText";
import MapView, {Marker} from 'react-native-maps';

const SearchDoctorsModal = (props) => {
  const vm = SearchDoctorsModalMethods(props);
  // console.log('Location', vm.location);


  let mockSpecialityItems = [];
  mockSpecialityItems.push({
    label: 'All',
    value: ''
  });
  vm.specialities.map(item => {
    mockSpecialityItems.push(
      {
        label: item.label,
        value: item.value,
      }
    );
  });

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
        <TouchableOpacity onPress={() => {
          vm.setLocationMode(false);
          props.onPressClose();
        }}>
          <MaterialCommunityIcon name={'window-close'} size={hp('3.5%')} color={Colors.white2}/>
        </TouchableOpacity>
      </View>
      <Separator color={Colors.grey_light}/>
      {vm.isLocationMode === false ? <KeyboardAvoidingView behavior={"padding"} style={styles.body}>
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
          <TouchableOpacity onPress={() => {
            vm.setLocationMode(true)
          }}>
            {/*<WhiteInput placeholder={__('browse_location')}/>*/}
            <Text style={styles.locationLabel}>
              {vm.location.address ? vm.location.address : __('browse_location')}
            </Text>
          </TouchableOpacity>
          <Space height={hp('5%')}/>
          <View style={styles.logoContainer}>
            <Image source={Images.logo.grey} style={styles.logo} resizeMode={'cover'}/>
          </View>
          <TouchableHighlight style={styles.whiteButton} onPress={vm.onPressFilterResults}>
            <Text style={styles.buttonLabel}>
              {__('filter_result')}
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView> :
        <View style={{flex: 1}}>
          {/*<MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -112.4324,
              latitudeDelta: 0.922,
              longitudeDelta: 0.421,
            }}
            style={StyleSheet.absoluteFillObject}
          >
            <Marker
              draggable={true}
              coordinate={vm.location}
              onDragEnd={(e) => vm.setLocation(e.nativeElement.coordinate)}
            />
          </MapView>*/}
          <LocationView
            apiKey={Config.googleMap.apiKey}
            initialLocation={vm.location}
            onLocationSelect={(value) => {
              vm.setLocation(value);
              vm.setLocationMode(false);
            }}
          />
        </View>
      }
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
    borderWidth: 1,
  },
  dropDownBack: {
    borderWidth: 0,
    backgroundColor: '#6ac6ed',
  },
  dropDownLabel: {
    backgroundColor: '#6ac6ed',
    color: Colors.white2,
    fontSize: hp('2%'),
    paddingHorizontal: wp('0%')
  },
  dropDownArrow: {
    // color: '#fff'
  },
  locationLabel : {
    backgroundColor: '#6ac6ed',
    padding: hp('1.6%'),
    fontSize: hp('1.8%'),
    color: Colors.white2,
    borderRadius: wp('1.5%'),
  }
});

export default observer(SearchDoctorsModal);
