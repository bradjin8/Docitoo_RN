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
import {scale} from '@/styles/Sizes';
import BlackText from "@/components/Text/BlackText";

const Login = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('contact_us')}>
      <View style={styles.container}>
        <Space height={30 * scale}/>
        <View style={styles.socialContainer}>
          <ImageButton image={Images.logo.contact_us} style={{marginHorizontal: 20}} onPress={vm.onPressImage}/>
        </View>
        <Space height={20}/>
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
    width: '90%',
    justifyContent: 'center',
    marginVertical: 18 * scale,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    height: '100%',
  },
  note: {
    fontSize: 16 * scale,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20 * scale,
    paddingVertical: 10 * scale,
  },
});

export default observer(Login);
