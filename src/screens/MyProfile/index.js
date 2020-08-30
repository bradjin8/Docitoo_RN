import React from 'react';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import {ProfileCard} from '@/screens/More';
import Colors from "@/styles/Colors";
import Separator from "@/components/Separator";
import useViewModel from './methods';

const PillReminder = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('my_profile')}>
      <View style={styles.container}>
        {vm.user && <ProfileCard user={vm.user}>
        </ProfileCard>}
        <Space height={50 * scale}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('name')} value={vm.user.fullName}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('email')} value={vm.user.email}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('phone_number')} value={vm.user.phoneNumber}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('gender')} value={vm.user.gender}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('blood_type')} value={vm.user.bloodType}/>
        <Separator color={Colors.grey} width={2}/>
        <KeyValueLabel name={__('language')} value={vm.user.language}/>
        <Space height={30 * scale}/>

        <TouchableHighlight style={styles.whiteButton} onPress={vm.onPressEdit} underlayColor={Colors.blue1}>
          <Text style={styles.whiteButtonLabel}>
            {__('edit_profile')}
          </Text>
        </TouchableHighlight>
        <Space height={30 * scale}/>

      </View>
    </BoardWithHeader>

  )
};

export const KeyValueLabel = ({name, value}) => {
  const kvlStyles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      // backgroundColor: '#ddd',
      marginVertical: 18 * scale,
    },
    name: {
      fontSize: 18 * scale,
      width: '42%'
    },
    value: {
      fontSize: 18 * scale,
      fontWeight: 'bold',
    }

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
    width: '90%',
    flexDirection: 'column',
    height: '92%',
    // backgroundColor: '#666',
  },
  whiteButtonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18 * scale,
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.blue1,
    alignContent: 'center',
  },
});

export default observer(PillReminder);
