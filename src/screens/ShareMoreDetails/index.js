import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Colors from '@/styles/Colors';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity, Image} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import BlueButton from '@/components/Button/BlueButton';
import TransBlueButton from '@/components/Button/TransBlueButton';
import ImageButton from '@/components/Button/ImageButton';
import IconButton from '@/components/Button/IconButton';
import Space from '@/components/Space';
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  uploadButton: {
    justifyContent: 'center',
  },
  image: {
    width: hp('7%'),
    height: hp('7%'),
  },
  dropDownContainer: {
    height: hp('6%'),
    marginVertical: hp('1%')
  },
  dropDownItem: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: Colors.grey_light,
    borderWidth: 0,
  },
  dropDownBack: {
    borderWidth: 0,
    backgroundColor: Colors.grey_light,
  },
  dropDownLabel: {
    backgroundColor: Colors.grey_light,
    color: Colors.grey_dark,
    fontSize: hp('2.2%')
  },

});

const ShareModeDetails = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('share_more_details')}>
      <View style={styles.socialContainer}>
        {vm.avatarSource === '' ?
          <IconButton name={'camera'} size={hp('8%')} color={Colors.white2} style={styles.uploadButton}
                      iconStyle={{opacity: 0.7, margin: hp('3%')}} onPress={vm.onPressChoose}/>
          : /*<ImageButton onPress={vm.onPressChoose} image={vm.avatarSource} style={styles.uploadButton}/>*/
          <ImageButton image={{uri: vm.avatarSource.uri}} imageStyle={styles.image} onPress={vm.onPressChoose}/>
        }
      </View>
      <Space height={hp('2%')}/>
      <TransBlueButton onPress={vm.onPressChoose} caption={__('upload_your_photo')}/>
      <Space height={hp('4%')}/>
      <View style={{width: '90%', ...(Platform.OS !== 'android' && {zIndex: 20})}} key={1}>
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
      <View style={{width: '90%', ...(Platform.OS !== 'android' && {zIndex: 10})}} key={2}>
        <DropDownPicker
          items={vm.bloodTypes}
          style={styles.dropDownBack}
          containerStyle={styles.dropDownContainer}
          itemStyle={styles.dropDownItem}
          dropDownStyle={styles.dropDown}
          labelStyle={styles.dropDownLabel}
          onChangeItem={item => vm.setGender(item.value)}
          placeholder={__('select_blood_type')}
        />
      </View>
      <View style={{width: '90%'}} key={3}>
        <BlueButton onPress={vm.onPressSubmit} caption={__('submit')}/>
      </View>
      <Space height={26}/>
    </BoardWithHeader>
  )
};

export default observer(ShareModeDetails);
