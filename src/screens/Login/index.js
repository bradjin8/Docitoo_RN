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
import {scale, windowWidth} from '@/styles/Sizes';

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 18 * scale,
  },
  container: {
    flexDirection: 'column',
    width: '90%',
  }
});

const Login = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('login')}>
      <View style={styles.container}>
        <BlackText text={__('login_with')}/>
        <View style={styles.socialContainer}>
          <ImageButton image={Images.logo.facebook} style={{marginHorizontal: 20 * scale}}
                       imageStyle={{width: windowWidth / 8, height: windowWidth / 8}}
                       onPress={vm.onPressFacebook}/>
          <ImageButton image={Images.logo.google} style={{marginHorizontal: 20 * scale}}
                       imageStyle={{width: windowWidth / 8, height: windowWidth / 8}}
                       onPress={vm.onPressFacebook}/>
        </View>
        <BlackText text={__('or_login_using_email')}/>
        <Space height={20 * scale}/>
        <GreyInput placeholder={__('email_address') + ' or ' + __('phone_number')} value={vm.emailOrPhone}
                   onChangeText={vm.setEmailOrPhone}/>
        <GreyInput placeholder={__('password')} value={vm.password} onChangeText={vm.setPassword} secureTextEntry={true}/>
        <BlueButton onPress={vm.onPressLogin} caption={__('login')}/>
        <GreyText text={__('sign_up_note')}/>
        <Space height={26 * scale}/>
        <TransBlueButton onPress={vm.onPressSignUp} caption={__('dont_have_account') + ' ' + __('sign_up')}/>
      </View>
    </BoardWithHeader>
  )
};

export default observer(Login);
