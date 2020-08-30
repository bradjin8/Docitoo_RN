import React from 'react';
import Container from '@/components/Container';
import {View, StyleSheet, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {observer} from 'mobx-react';
import Space from '@/components/Space';
import GreyInput from '@/components/Input/GreyInput';
import __ from "@/assets/lang";
import ScrollBoardWithHeaderLBButton from "@/components/Panel/ScrollBoardWithHeaderLRButton";
import {scale} from "@/styles/Sizes";
import {default_avatar_url} from "@/constants/MockUpData";
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from "@/styles/Colors";
import useViewModel from './methods';
import BlueButton from "@/components/Button/BlueButton";

const EditProfile = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      {vm.user &&
      <ScrollBoardWithHeaderLBButton lButtonCaption={__('back')} rButtonCaption={__('')}
                                     onPressLeftButton={vm.onPressBack}
                                     onPressRightButton={vm.onPressBack}>
        <ProfileCard onPressAvatar={vm.onPressAvatar}
                     user={vm.user}/>
        <Space height={30 * scale}/>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <GreyInput placeholder={__('full_name')} value={vm.fullName} onChangeText={(val) => vm.setFullName(val)}/>
          <GreyInput placeholder={__('email_address')} value={vm.email}
                     onChangeText={(val) => vm.setEmailAddress(val)}/>
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
            onChangeItem={item => vm.setGender(item.value)}
            placeholder={__('select_blood_type')}
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
            onChangeItem={item => vm.setGender(item.value)}
            placeholder={__('language')}
          />
        </View>
        <BlueButton onPress={vm.onPressUpdate} caption={__('update_profile')}/>

        <Space height={200 * scale}/>

      </ScrollBoardWithHeaderLBButton>}
    </Container>
  );
};

const ProfileCard = ({user, onPressAvatar}) => {
  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={onPressAvatar}>
        <Image source={{uri: user.avatarUrl}} style={styles.profileAvatar}/>
      </TouchableOpacity>
      <View style={styles.profileDesc}>
        <Text style={styles.profileName}>{user.fullName}</Text>
        <Text style={styles.profileDate}>{'User since ' + user.joinDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    // height: '100%',
    flexDirection: 'row',
    // backgroundColor: '#111',
  },
  profileAvatar: {
    width: 80 * scale,
    height: 80 * scale,
    borderRadius: 5 * scale,
  },
  profileDesc: {
    flexDirection: 'column',
    marginLeft: 30 * scale,
    justifyContent: 'space-evenly',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 20 * scale,
  },
  profileDate: {
    fontSize: 18 * scale,
  },
  dropDownContainer: {
    height: 60 * scale,
    marginVertical: 10 * scale
  },
  dropDownItem: {
    justifyContent: 'flex-start',
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

});

export default observer(EditProfile);


