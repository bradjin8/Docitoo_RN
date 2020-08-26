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

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    marginVertical: 18,
  }
});

const Login = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('login')}>
      <BlackText text={__('login_with')} />
      <View style={styles.socialContainer}>
        <ImageButton image={Images.logo.facebook} style={{marginHorizontal: 20}} onPress={vm.onPressFacebook}>test</ImageButton>
        <ImageButton image={Images.logo.google} style={{marginHorizontal: 20}} onPress={vm.onPressFacebook}/>
      </View>
      <BlackText text={__('or_login_using_email')} />
      <Space height={20} />
      <GreyInput placeholder={__('email_address') + ' or ' + __('phone_number')} value={vm.emailOrPhone} onChangeText={vm.setEmailOrPhone}/>
      <GreyInput placeholder={__('password')} value={vm.password} onChangeText={vm.setPassword}/>
      <BlueButton onPress={vm.onPressLogin} caption={__('login')} />
      <GreyText text={__('sign_up_note')} />
      <Space height={26}/>
      <TransBlueButton onPress={vm.onPressSignUp} caption={__('dont_have_account') + ' ' + __('sign_up')}/>
    </BoardWithHeader>
  )
};

export default observer(Login);
