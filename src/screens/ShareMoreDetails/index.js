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
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  uploadButton: {
    justifyContent: 'center',
    padding: 25,
  },
  dropDownContainer: {
    height: 60 * scale,
    marginVertical: 10 * scale
  },
  dropDownItem: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark,
    borderWidth: 0,
  },
  dropDownBack: {
    borderWidth: 0,
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark
  },
  dropDownLabel: {
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark,
    fontSize: 16 * scale
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
      <View style={{width: '90%', ...(Platform.OS !== 'android' && {zIndex: 20})}}>
        <DropDownPicker
          items={[
            {label: __('male'), value: 'male'},
            {label: __('female'), value: 'female'}
          ]}
          style={styles.dropDownBack}
          containerStyle={styles.dropDownContainer}
          itemStyle={styles.dropDownItem}
          dropDownStyle={styles.dropDown}
          labelStyle={styles.dropDownLabel}
          onChangeItem={item => vm.setGender(item.value)}
          placeholder={__('select_gender')}
        />
      </View>
      <View style={{width: '90%', ...(Platform.OS !== 'android' && {zIndex: 10})}}>
        <DropDownPicker
          items={[
            {label: 'A', value: 'A'},
            {label: 'B', value: 'B'},
            {label: 'O', value: 'O'},
            {label: 'AB', value: 'AB'}
          ]}
          style={styles.dropDownBack}
          containerStyle={styles.dropDownContainer}
          itemStyle={styles.dropDownItem}
          dropDownStyle={styles.dropDown}
          labelStyle={styles.dropDownLabel}
          onChangeItem={item => vm.setGender(item.value)}
          placeholder={__('select_blood_type')}
        />
      </View>
      <BlueButton onPress={vm.onPressSubmit} caption={__('submit')}/>
      <Space height={26}/>
    </BoardWithHeader>
  )
};

export default observer(ShareModeDetails);
