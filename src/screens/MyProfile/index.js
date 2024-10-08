import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import {ProfileCard} from '@/screens/More';
import Colors from '@/styles/Colors';
import Separator from '@/components/Separator';
import useViewModel from './methods';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {capitalizeString} from '@/utils/String';
import BoardWithHeaderBackButton from '../../components/Panel/BoardWithHeaderBackButton';

const PillReminder = (props) => {
  const vm = useViewModel(props);

  const renderContent = () => {
    return (<>
      {vm.user && <View style={styles.container}>
        <ProfileCard user={vm.user}>
        </ProfileCard>
        <Space height={hp('5%')}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('name', vm.user.language)} value={vm.user.fullName}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('email', vm.user.language)} value={vm.user.email}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('phone_number', vm.user.language)} value={vm.user.phoneNumber}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('gender', vm.user.language)} value={vm.user.gender}/>
        <Separator color={Colors.grey} width={2}/>

        {vm.user.accountType === 'User' &&
        <>
          <KeyValueLabel name={__('blood_type', vm.user.language)} value={vm.user.bloodType}/>
          <Separator color={Colors.grey} width={2}/>
        </>}
        {vm.user.accountType === 'Doctor' &&
        <>
          <KeyValueLabel name={__('speciality', vm.user.language)} value={vm.user.speciality.toUpperCase()}/>
          <Separator color={Colors.grey} width={2}/>
          <KeyValueLabel name={__('address', vm.user.language)}
                         value={vm.user.street + ', ' + vm.user.city + ', ' + vm.user.country || ''}/>
          <Separator color={Colors.grey} width={2}/>
        </>}
        <KeyValueLabel name={__('language', vm.user.language)} value={capitalizeString(vm.user.language)}/>
        <Space height={hp('3%')}/>

        {vm.user.accountType === 'User' &&
        <TouchableHighlight style={styles.whiteButton} onPress={vm.onPressEdit} underlayColor={Colors.blue1}>
          <Text style={styles.whiteButtonLabel}>
            {__('edit_profile', vm.user.language)}
          </Text>
        </TouchableHighlight>}
        <Space height={hp('3%')}/>
      </View>}
    </>);
  };

  if (Platform.OS === 'ios') {
    return (
      <BoardWithHeaderBackButton title={__('my_profile', vm.user.language)} onPressButton={vm.onPressBack}
                                 buttonCaption={__('back', vm.user.language)}>
        {renderContent()}
      </BoardWithHeaderBackButton>
    );
  } else {
    return (
      <BoardWithHeader title={__('my_profile', vm.user.language)}>
        {renderContent()}
      </BoardWithHeader>
    );
  }
};

export const KeyValueLabel = ({name, value}) => {
  const kvlStyles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      // backgroundColor: '#ddd',
      marginVertical: hp('1.8%'),
    },
    name: {
      fontSize: hp('1.8%'),
      width: wp('42%'),
    },
    value: {
      fontSize: hp('1.8%'),
      fontWeight: 'bold',
    },

  });

  return (
    <View style={kvlStyles.container}>
      <Text style={kvlStyles.name}>{name}</Text>
      <Text style={kvlStyles.value}>{value}</Text>
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
  whiteButtonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: hp('1.8%'),
    borderRadius: hp('0.5%'),
    borderWidth: 1,
    borderColor: Colors.blue1,
    alignContent: 'center',
  },
});

export default observer(PillReminder);
