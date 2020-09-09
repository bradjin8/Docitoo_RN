import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import ReactNative, {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import GreyInput from '@/components/Input/GreyInput';
import BlueButton from '@/components/Button/BlueButton';
import ImageButton from '@/components/Button/ImageButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const Login = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('contact_us')}>
      {/*<KeyboardAwareScrollView*/}
        {/*innerRef={ref => {*/}
          {/*vm.setScroll(ref)*/}
        {/*}}*/}
      {/*>*/}
        <View style={styles.container}>
          <Space height={hp('3%')}/>
          <View style={styles.socialContainer}>
            <ImageButton image={Images.logo.contact_us} style={{marginHorizontal: hp('2%')}} onPress={vm.onPressImage}/>
          </View>
          <Space height={hp('2%')}/>
          <Text style={styles.note}>{__('contact_us_note')}</Text>
          <GreyInput placeholder={__('subject')} value={vm.subject}
                     onChangeText={(value) => vm.setSubject(value)}
                     // onFocus={(event) => {
                     //   vm.scrollToInput(ReactNative.findNodeHandle(event.target))
                     // }}
          />
          <GreyInput placeholder={__('message')} value={vm.message}
                     onChangeText={(value) => vm.setMessage(value)} numberOfLines={4} multiline
                     // onFocus={(event) => {
                     //   vm.scrollToInput(ReactNative.findNodeHandle(event.target))
                     // }}
          />
          <BlueButton onPress={vm.onPressSend} caption={__('send_message')}/>
        </View>
      {/*</KeyboardAwareScrollView>*/}
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
    zIndex: -10,
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
