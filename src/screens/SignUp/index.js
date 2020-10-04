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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Loading from "@/components/Loading";


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
    justifyContent: 'flex-start'
  },
});

const SignUp = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('sign_up')}>
      {vm.user.isLoggingIn ?
        <Loading/>
        :
        <View style={styles.container}>
          <BlackText text={__('sign_up_with')}/>
          <View style={styles.socialContainer}>
            <ImageButton image={Images.logo.facebook} style={{marginHorizontal: wp('3%'),}}
                         imageStyle={{width: hp('7%'), height: hp('7%')}}
                         onPress={vm.onPressFacebook}/>
            <ImageButton image={Images.logo.google} style={{marginHorizontal: wp('3%')}}
                         imageStyle={{width: hp('7%'), height: hp('7%')}}
                         onPress={vm.onPressGoogle}/>
          </View>
          <BlackText text={__('or_sign_up_using_email')}/>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Space height={hp('5%')}/>
            <GreyInput placeholder={__('full_name')} value={vm.fullName} onChangeText={vm.setFullName}/>
            <GreyInput placeholder={__('email_address')} value={vm.email} onChangeText={vm.setEmail}/>
            <GreyInput placeholder={__('phone_number') + ' (' + __('optional') + ')'} value={vm.phoneNumber}
                       onChangeText={vm.setPhoneNumber}/>
            <GreyInput placeholder={__('password')} value={vm.password} onChangeText={vm.setPassword}
                       secureTextEntry={true}/>
            <Space height={hp('2%')}/>
          </KeyboardAvoidingView>
          <BlueButton onPress={vm.onPressSignUp} caption={__('sign_up')}/>
          <GreyText text={__('sign_up_note')}/>
          <Space height={hp('4%')}/>
          <TransBlueButton onPress={vm.onPressLogin} caption={__('already_have_account') + ' ' + __('login')}/>
        </View>
      }
    </BoardWithHeader>
  )
};

export default observer(SignUp);
