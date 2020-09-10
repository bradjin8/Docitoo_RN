import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, Button, TouchableOpacity, Image, Platform} from 'react-native';
import __ from '@/assets/lang';
import Space from '@/components/Space';
import {scale, headerHeight} from '@/styles/Sizes';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import BoardWithHeader from "@/components/Panel/BoardWithHeader";
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Images from "@/styles/Images";
import * as datetime from 'node-datetime';

const ViewDoctor = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BoardWithHeader title={__('more')}>
        <View style={styles.container}>
          {vm.user && <ProfileCard user={vm.user}>
          </ProfileCard>}
          <Space height={hp('5%')}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressSearchDoctors}>
            <View style={styles.iconContainer}>
              <Icon name={'search'} size={hp('2.5%')} color={Colors.grey_dark}/>
            </View>
            <Text style={styles.buttonCaption}>{__('search_doctors')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressPillReminder}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'pill'} color={Colors.grey_dark} size={hp('3.2%')}
                                     style={{transform: [{rotate: '90deg'}]}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('pill_reminder')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressAccountSettings}>
            <View style={styles.iconContainer}>
              {/*<EntypoIcon name={'cog'} size={30} color={Colors.grey_dark} style={{transform: [{rotate: '22.5deg'}]}}/>*/}
              <FontistoIcon name={'player-settings'} size={hp('2.9%')} color={Colors.grey_dark}
                            style={{transform: [{rotate: '22.5deg'}]}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('account_settings')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressTermsAndConditions}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'briefcase-check-outline'} color={Colors.grey_dark} size={hp('2.9%')}
                                     style={{/*{transform: [{scaleX: 0.5}]}*/}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('terms_and_conditions')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressContactUs}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'contacts'} size={hp('2.9%')} color={Colors.grey_dark}/>
            </View>
            <Text style={styles.buttonCaption}>{__('contact_us')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressLogout}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'logout'} size={hp('3.2%')} color={Colors.grey_dark}
                                     style={{transform: [{rotateY: '180deg'}]}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('logout')}</Text>
          </TouchableOpacity>
        </View>
      </BoardWithHeader>
      <DropDownPicker
        items={vm.langItems}
        style={styles.dropDownBack}
        containerStyle={styles.dropDownContainer}
        itemStyle={styles.dropDownItem}
        dropDownStyle={styles.dropDown}
        labelStyle={styles.dropDownLabel}
        arrowStyle={styles.dropDownArrow}
        onChangeItem={item => vm.setLang(item.value)}
        arrowColor={'#fff'}
        customArrowUp={({size, color}) => (<Icon size={hp('2%')} color={'#fff'} name={'caret-up'}/>)}
        customArrowDown={({size, color}) => (<Icon size={hp('2%')} color={'#fff'} name={'caret-down'}/>)}
        value={vm.lang}
        defaultValue={vm.lang}
        placeholder={''}
      />
    </Container>
  )
};

export const ProfileCard = ({user}) => {
  return (
    <View style={styles.profileContainer}>
      {user.avatarUrl ? <Image source={{uri: user.avatarUrl}} style={styles.profileAvatar}/> : <Image
        source={Images.placeholder.avatar_default} style={styles.profileAvatar}/>}
      <View style={styles.profileDesc}>
        <Text style={styles.profileName}>{user.fullName}</Text>
        <Text style={styles.profileDate}>{'User since ' + datetime.create(user.createdAt).format('f Y')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    flexDirection: 'column',
    height: '92%',
    // backgroundColor: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.8%'),
  },
  iconContainer: {
    width: hp('6%'),
    height: hp('6%'),
    borderRadius: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#999',
    shadowRadius: hp('1%'),
    shadowOpacity: 0.75,
    backgroundColor: '#fff',
    elevation: 10,
  },
  buttonCaption: {
    marginLeft: hp('2.5%'),
    fontSize: hp('2.5%'),
    color: Colors.grey_dark,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  profileAvatar: {
    width: hp('9%'),
    height: hp('9%'),
    borderRadius: hp('0.5%'),
  },
  profileDesc: {
    flexDirection: 'column',
    marginLeft: wp('5%'),
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
    height: Platform.OS === 'ios' ? hp('4%') : headerHeight * 0.9,
    width: wp('20%'),
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp('4%') : headerHeight * 0.05,
    right: wp('4%'),
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
    fontSize: wp('3%')
  },
  dropDownArrow: {
    // color: '#fff'
  }
});

export default observer(ViewDoctor);
