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

const ViewDoctor = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BoardWithHeader title={__('more')}>
        <View style={styles.container}>
          {vm.user && <ProfileCard user={vm.user}>
          </ProfileCard>}
          <Space height={50 * scale}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressSearchDoctors}>
            <View style={styles.iconContainer}>
              <Icon name={'search'} size={24} color={Colors.grey_dark}/>
            </View>
            <Text style={styles.buttonCaption}>{__('search_doctors')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressPillReminder}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'pill'} color={Colors.grey_dark} size={30} style={{transform: [{rotate: '90deg'}]}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('pill_reminder')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressAccountSettings}>
            <View style={styles.iconContainer}>
              {/*<EntypoIcon name={'cog'} size={30} color={Colors.grey_dark} style={{transform: [{rotate: '22.5deg'}]}}/>*/}
              <FontistoIcon name={'player-settings'} size={28} color={Colors.grey_dark} style={{transform: [{rotate: '22.5deg'}]}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('account_settings')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressTermsAndConditions}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'briefcase-check-outline'} color={Colors.grey_dark} size={28} style={{/*{transform: [{scaleX: 0.5}]}*/}}/>
            </View>
            <Text style={styles.buttonCaption}>{__('terms_and_conditions')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressContactUs}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'contacts'} size={28} color={Colors.grey_dark}/>
            </View>
            <Text style={styles.buttonCaption}>{__('contact_us')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={vm.onPressLogout}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcon name={'logout'} size={30} color={Colors.grey_dark} style={{transform: [{rotateY: '180deg'}]}}/>
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
        customArrowUp={({size, color}) => (<Icon size={18 * scale} color={'#fff'} name={'caret-up'}/>)}
        customArrowDown={({size, color}) => (<Icon size={18 * scale} color={'#fff'} name={'caret-down'}/>)}
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
      <Image source={{uri: user.avatarUrl}} style={styles.profileAvatar}/>
      <View style={styles.profileDesc}>
        <Text style={styles.profileName}>{user.fullName}</Text>
        <Text style={styles.profileDate}>{'User since ' + user.joinDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'column',
    height: '92%',
    // backgroundColor: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6 * scale,
  },
  iconContainer: {
    width: 56 * scale,
    height: 56 * scale,
    borderRadius: 28 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#999',
    shadowRadius: 10 * scale,
    shadowOpacity: 0.75,
    backgroundColor: '#fff',
    elevation: 10,
  },
  buttonCaption: {
    marginLeft: 24 * scale,
    fontSize: 22 * scale,
    color: Colors.grey_dark,
    fontWeight: 'bold',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
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
    height: Platform.OS === 'ios' ? 40 * scale : headerHeight * 0.9,
    width: 100 * scale,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 38 * scale : headerHeight * 0.05,
    right: 20 * scale,
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
    fontSize: 16 * scale
  },
  dropDownArrow: {
    // color: '#fff'
  }
});

export default observer(ViewDoctor);
