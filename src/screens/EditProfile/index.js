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
import useViewModel from './methods';
import BlueButton from "@/components/Button/BlueButton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Images from "@/styles/Images";
import * as datetime from "node-datetime";
const tag = 'Screen::EditProfile';

const EditProfile = (props) => {
  const vm = useViewModel(props);

  const ProfileCard = ({user, onPressAvatar}) => {
    console.log(tag, 'ProfileCard->AvatarSource', user.avatarSource);
    return (
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={onPressAvatar}>
          {user.avatarSource && <Image source={{uri: user.avatarSource}} style={styles.profileAvatar}/>}
        </TouchableOpacity>
        <View style={styles.profileDesc}>
          <Text style={styles.profileName}>{user.fullName}</Text>
          <Text style={styles.profileDate}>{'User since ' + datetime.create(user.createdAt).format('f Y')}</Text>
        </View>
      </View>
    );
  };

  return (
    <Container>
      {vm.user &&
      <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('')}
                                     onPressLeftButton={vm.onPressBack}
                                     onPressRightButton={vm.onPressBack}>
        <ProfileCard onPressAvatar={vm.onPressAvatar}
                     user={{fullName: vm.user.fullName, createdAt: vm.user.createdAt, avatarSource: vm.avatarSource ? vm.avatarSource : vm.user.avatarUrl}}/>
        <Space height={hp('3%')}/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <GreyInput placeholder={__('full_name')} value={vm.fullName} onChangeText={(val) => vm.setFullName(val)}/>
          <GreyInput placeholder={__('email_address')} value={vm.email}
                     onChangeText={(val) => vm.setEmail(val)}/>
          <GreyInput placeholder={__('phone_number') + ' (' + __('optional') + ')'} value={vm.phoneNumber}
                     onChangeText={(val) => vm.setPhoneNumber(val)}/>
          <GreyInput placeholder={__('password')} value={vm.password} onChangeText={(val) => vm.setPassword(val)} secureTextEntry={true}/>
        </KeyboardAvoidingView>
        <View style={{width: '100%', ...(Platform.OS !== 'android' && {zIndex: 50})}}>
          <DropDownPicker
            items={[
              {label: __('female'), value: 'female'},
              {label: __('male'), value: 'male'},
            ]}
            style={styles.dropDownBack}
            containerStyle={styles.dropDownContainer}
            itemStyle={styles.dropDownItem}
            dropDownStyle={styles.dropDown}
            labelStyle={styles.dropDownLabel}
            onChangeItem={item => vm.setGender(item.value)}
            defaultValue={vm.user.gender}
            placeholder={__('select_gender')}
          />
        </View>
        <View style={{width: '100%', ...(Platform.OS !== 'android' && {zIndex: 40})}}>
          <DropDownPicker
            items={vm.bloodTypes}
            style={styles.dropDownBack}
            containerStyle={styles.dropDownContainer}
            itemStyle={styles.dropDownItem}
            dropDownStyle={styles.dropDown}
            labelStyle={styles.dropDownLabel}
            onChangeItem={item => vm.setBloodType(item.value)}
            placeholder={__('select_blood_type')}
            defaultValue={vm.user.bloodType}
          />
        </View>
        <View style={{width: '100%', ...(Platform.OS !== 'android' && {zIndex: 30})}}>
          <DropDownPicker
            items={[
              {label: __('english'), value: 'english'},
            ]}
            style={styles.dropDownBack}
            containerStyle={styles.dropDownContainer}
            itemStyle={styles.dropDownItem}
            dropDownStyle={styles.dropDown}
            labelStyle={styles.dropDownLabel}
            onChangeItem={item => vm.setLanguage(item.value)}
            placeholder={__('language')}
          />
        </View>
        <BlueButton onPress={vm.onPressUpdate} caption={__('update_profile')}/>

        <Space height={hp('20%')}/>

      </ScrollBoardWithHeaderLBButton>}
    </Container>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: wp('90%'),
    // height: '100%',
    flexDirection: 'row',
    // backgroundColor: '#111',
  },
  profileAvatar: {
    width: hp('9%'),
    height: hp('9%'),
    borderRadius: hp('0.5%'),
  },
  profileDesc: {
    flexDirection: 'column',
    marginLeft: hp('3%'),
    justifyContent: 'space-evenly',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  profileDate: {
    fontSize: hp('2%'),
  },
  dropDownContainer: {
    height: hp('6%'),
    marginVertical: hp('1%'),
  },
  dropDownItem: {
    justifyContent: 'flex-start',
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

});

export default observer(EditProfile);


