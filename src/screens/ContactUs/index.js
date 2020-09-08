import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import GreyInput from '@/components/Input/GreyInput';
import BlueButton from '@/components/Button/BlueButton';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const Login = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('contact_us')}>
      <View style={styles.container}>
        <Space height={hp('3%')}/>
        <View style={styles.socialContainer}>
          <ImageButton image={Images.logo.contact_us} style={{marginHorizontal: hp('2%')}} onPress={vm.onPressImage}/>
        </View>
        <Space height={hp('2%')}/>
        <Text style={styles.note}>{__('contact_us_note')} </Text>
        <GreyInput placeholder={__('subject')} value={vm.subject} onChangeText={(value) => vm.setSubject(value)}/>
        <GreyInput placeholder={__('message')} value={vm.message} onChangeText={(value) => vm.setMessage(value)}  numberOfLines={4} multiline />
        <BlueButton onPress={vm.onPressSend} caption={__('send_message')}/>
      </View>
    </BoardWithHeader>
  )
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    justifyContent: 'center',
    marginVertical: hp('2%'),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    width: wp('90%'),
    height: '100%',
  },
  note: {
    fontSize: hp('1.6%'),
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: hp('2%'),
    paddingVertical: hp('1%'),
  },
});

export default observer(Login);
