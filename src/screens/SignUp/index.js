import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import GreyInput from '@/components/Input/GreyInput';
import BlueButton from '@/components/Button/BlueButton';
import GreyText from '@/components/Text/GreyText';
import BlackText from '@/components/Text/BlackText';
import TransBlueButton from '@/components/Button/TransBlueButton';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';


const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    marginVertical: 18 * scale,
  },
  container: {
    flexDirection: 'column',
    width: '90%',
  },
});

const SignUp = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('sign_up')}>
      <View style={styles.container}>
        <BlackText text={__('sign_up_with')}/>
        <View style={styles.socialContainer}>
          <ImageButton image={Images.logo.facebook} style={{marginHorizontal: 20 * scale}}
                       onPress={vm.onPressFacebook}/>
          <ImageButton image={Images.logo.google} style={{marginHorizontal: 20 * scale}} onPress={vm.onPressFacebook}/>
        </View>
        <BlackText text={__('or_sign_up_using_email')}/>
        <Space height={20 * scale}/>
        <GreyInput placeholder={__('full_name')} value={vm.fullName} onChangeText={vm.setFullName}/>
        <GreyInput placeholder={__('email_address')} value={vm.emailAddress} onChangeText={vm.setEmailAddress}/>
        <GreyInput placeholder={__('phone_number') + ' (' + __('optional') + ')'} value={vm.phoneNumber}
                   onChangeText={vm.setPhoneNumber}/>
        <GreyInput placeholder={__('password')} value={vm.password} onChangeText={vm.setPassword}/>
        <BlueButton onPress={vm.onPressSignUp} caption={__('sign_up')}/>
        <GreyText text={__('sign_up_note')}/>
        <Space height={26 * scale}/>
        <TransBlueButton onPress={vm.onPressLogin} caption={__('already_have_account') + ' ' + __('login')}/>
      </View>
    </BoardWithHeader>
  )
};

export default observer(SignUp);
