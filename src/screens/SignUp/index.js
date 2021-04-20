import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, KeyboardAvoidingView, View, Text, TouchableOpacity} from 'react-native';
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Loading from '@/components/Loading';
import PhoneInput from 'react-native-phone-number-input';


const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: hp('2%'),
  },
  container: {
    flexDirection: 'column',
    width: wp('90%'),
    justifyContent: 'flex-start',
  },
});

const SignUp = (props) => {
  const vm = useViewModel(props);

  console.log(vm.phone, vm.validPhone, vm.delay);

  return (
    <BoardWithHeader title={__('sign_up', vm.user.language)}>
      {vm.user.isLoggingIn ?
        <Loading/>
        :
        <View style={styles.container}>
          <BlackText text={__('sign_up_with', vm.user.language)}/>
          <View style={styles.socialContainer}>
            <ImageButton image={Images.logo.facebook} style={{marginHorizontal: wp('3%')}}
                         imageStyle={{width: hp('7%'), height: hp('7%')}}
                         onPress={vm.onPressFacebook}/>
            <ImageButton image={Images.logo.google} style={{marginHorizontal: wp('3%')}}
                         imageStyle={{width: hp('7%'), height: hp('7%')}}
                         onPress={vm.onPressGoogle}/>
          </View>
          <BlackText text={__('or_sign_up_using_email', vm.user.language)}/>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Space height={hp('5%')}/>
            <GreyInput placeholder={__('full_name', vm.user.language)} value={vm.fullName}
                       onChangeText={vm.setFullName}/>
            {vm.authMode === 'email' && <>
              <GreyInput placeholder={__('email_address', vm.user.language)} value={vm.email}
                         onChangeText={vm.setEmail}/>
              <GreyInput placeholder={__('password', vm.user.language)} value={vm.password}
                         onChangeText={vm.setPassword}
                         secureTextEntry={true}/>
              <BlueButton onPress={vm.onPressSignUp} caption={__('sign_up', vm.user.language)}/>
              <Space height={hp(2)}/>
              <TransBlueButton onPress={() => vm.setAuthMode('phone')} caption={__('use phone', vm.user.language)}/>
            </>}
            {vm.authMode === 'phone' && <>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                  <PhoneInput
                    ref={vm.phoneInput}
                    defaultCode={'US'}
                    defaultValue={vm.phone}
                    value={vm.phone}
                    disabled={vm.delay > 0}
                    layout={'first'}
                    onChangeText={(text) => {
                      if (vm.delay === 0) {
                        vm.setPhone(text);
                      }
                    }}
                    onChangeFormattedText={(text) => {
                    }}
                    // withShadow
                    autoFocus
                    // withDarkTheme
                    containerStyle={{width: wp(90)}}
                  />
                </View>
                {vm.validPhone && <TouchableOpacity onPress={vm.onPressSend} style={{position: 'absolute', right: 5}}>
                  <Text>{vm.delay === 0 ? __('Send Code', vm.user.language) : `Resend (${vm.delay})`}</Text>
                </TouchableOpacity>}
              </View>
              {vm.delay > 0 &&
              <>
                <GreyInput placeholder={__('6-digit code', vm.user.language)}
                           value={vm.code}
                           onChangeText={vm.setCode}/>
                <BlueButton onPress={vm.onPressVerify} caption={'Verify'}/>
              </>
              }
              <Space height={hp(2)}/>
              <TransBlueButton onPress={() => vm.setAuthMode('email')} caption={__('use email', vm.user.language)}/>
            </>}
            <Space height={hp('2%')}/>
          </KeyboardAvoidingView>
          <GreyText text={__('sign_up_note', vm.user.language)}/>
          <Space height={hp('4%')}/>
          <TransBlueButton onPress={vm.onPressLogin}
                           caption={__('already_have_account', vm.user.language) + ' ' + __('login', vm.user.language)}/>
        </View>
      }
    </BoardWithHeader>
  );
};

export default observer(SignUp);
