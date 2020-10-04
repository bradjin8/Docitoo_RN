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
import Loading from '@/components/Loading'
import {scale, windowWidth} from '@/styles/Sizes';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {GoogleSigninButton} from "@react-native-community/google-signin";

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

const Login = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('login')}>
      {vm.user.isLoggingIn ?
        <Loading/> :
        <View style={styles.container}>
          <BlackText text={__('login_with')}/>
          <View style={styles.socialContainer}>
            <ImageButton image={Images.logo.facebook} style={{marginHorizontal: wp('3%'),}}
                         imageStyle={{width: hp('7%'), height: hp('7%')}}
                         onPress={vm.onPressFacebook}/>
            <ImageButton image={Images.logo.google} style={{marginHorizontal: wp('3%')}}
                         imageStyle={{width: hp('7%'), height: hp('7%')}}
                         onPress={vm.onPressGoogle}/>
            {/*<GoogleSigninButton onPress={vm.onPressGoogle}/>*/}
          </View>
          <BlackText text={__('or_login_using_email')}/>
          <Space height={hp('6%')}/>
          <GreyInput placeholder={__('email_address') + ' or ' + __('phone_number')} value={vm.emailOrPhone}
                     onChangeText={vm.setEmailOrPhone}/>
          <Space height={hp('1.2%')}/>
          <GreyInput placeholder={__('password')} value={vm.password} onChangeText={vm.setPassword}
                     secureTextEntry={true}/>
          <BlueButton onPress={vm.onPressLogin} caption={__('login')}/>
          <GreyText text={__('sign_up_note')}/>
          <Space height={hp('5%')}/>
          <TransBlueButton onPress={vm.onPressSignUp} caption={__('dont_have_account') + ' ' + __('sign_up')}/>
        </View>
      }
    </BoardWithHeader>
  )
};

export default observer(Login);
