import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import GreyInput from '@/components/Input/GreyInput';
import BlueButton from '@/components/Button/BlueButton';
import TransBlueButton from '@/components/Button/TransBlueButton';
import ImageButton from '@/components/Button/ImageButton';
import IconButton from '@/components/Button/IconButton';
import Space from '@/components/Space';
import Images from '@/styles/Images';
import {scale} from '@/styles/Sizes';

const styles = StyleSheet.create({
  uploadButton: {
    justifyContent: 'center',
    padding: 25,
  }
});

const ShareModeDetails = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('share_more_details')}>
      <View style={styles.socialContainer}>
        <IconButton name={'camera'} size={50 * scale} color={Colors.white2} style={styles.uploadButton}
                    iconStyle={{opacity: 0.7}} onPress={vm.onPressChoose}/>
      </View>
      <Space height={20 * scale}/>
      <TransBlueButton onPress={vm.onPressChoose} caption={__('upload_your_photo')}/>
      <Space height={20}/>
      <GreyInput placeholder={__('email_address') + ' or ' + __('phone_number')} value={vm.emailOrPhone}
                 onChangeText={vm.setEmailOrPhone}/>
      <GreyInput placeholder={__('password')} value={vm.password} onChangeText={vm.setPassword}/>
      <BlueButton onPress={vm.onPressSubmit} caption={__('submit')}/>
      <Space height={26}/>
    </BoardWithHeader>
  )
};

export default observer(ShareModeDetails);
