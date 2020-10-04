import React from 'react';
import {observer} from 'mobx-react';
import {
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import __ from '@/assets/lang';
import BoardWithHeader from '@/components/Panel/BoardWithHeader';
import Space from '@/components/Space';
import {scale} from '@/styles/Sizes';
import Colors from "@/styles/Colors";
import Images from '@/styles/Images';
import useViewModel from './methods';
import Icon from "react-native-vector-icons/FontAwesome5";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import Loading from '@/components/Loading';

const DoctorsByCategory = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('doctors')}>
      {vm.data.isProcessing ?
        <Loading/>
        :
        <ScrollView style={styles.container}>
          <View style={styles.searchContainer}>
            <Icon name={'search'} size={wp('5%')} color={Colors.grey}/>
            <TextInput style={styles.searchInput} value={vm.searchString} placeholder={__('search_for_doctors')}
                       onChangeText={(val) => vm.setSearchString(val)}/>
          </View>
          <Space height={hp('1%')}/>
          <Text style={styles.note}>
            {__('browse_doctors_by_category')}
          </Text>
          <View style={styles.categoryLine}>
            <CategoryButton image={Images.category.gynecologist} caption={__('gynecologist')}
                            onPress={vm.onPressGynecologist}/>
            <CategoryButton image={Images.category.skin} caption={__('skin_specialist')} onPress={vm.onPressSkin}/>
          </View>
          <View style={styles.categoryLine}>
            <CategoryButton image={Images.category.child} caption={__('child_specialist')}
                            onPress={vm.onPressChild}/>
            <CategoryButton image={Images.category.orthopedic} caption={__('orthopedic_surgeon')}
                            onPress={vm.onPressOrthopedic}/>
          </View>
          <View style={styles.categoryLine}>
            <CategoryButton image={Images.category.ent} caption={__('ent_specialist')}
                            onPress={vm.onPressENT}/>
            <CategoryButton image={Images.category.diagnostics} caption={__('diagnostics')}
                            onPress={vm.onPressDiagnostics}/>
          </View>
          <View style={styles.categoryLine}>
            <CategoryButton image={Images.category.diabetes} caption={__('diabetes_specialist')}
                            onPress={vm.onPressDiabetes}/>
            <CategoryButton image={Images.category.eye} caption={__('eye_specialist')} onPress={vm.onPressEye}/>
          </View>
          <Space height={hp('10%')}/>
        </ScrollView>
      }
    </BoardWithHeader>
  )
};

export const CategoryButton = ({image, caption, onPress}) => {
  const buttonWidth = wp('40%');
  const imageWidth = buttonWidth / 3;

  const cbStyles = StyleSheet.create({
    container: {
      width: buttonWidth,
      height: buttonWidth,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      elevation: 10,
      shadowColor: '#ddd',
      shadowRadius: wp('1%'),
      shadowOpacity: 0.4,
      backgroundColor: '#fff',
      paddingTop: hp('2%'),
      marginVertical: wp('3%')
    },
    caption: {
      color: '#777',
      fontWeight: 'bold',
      fontSize: hp('1.7%'),
    },
    image: {
      width: imageWidth,
      height: imageWidth,
    }
  });

  return (
    <TouchableOpacity style={cbStyles.container} onPress={onPress}>
      <Image source={image} style={cbStyles.image} resizeMode={'contain'}/>
      <Text style={cbStyles.caption}>
        {caption}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    flexDirection: 'column',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.grey_light,
    borderRadius: wp('1.5%'),
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    width: '100%',
    top: hp('1%'),
    zIndex: 50
  },
  searchInput: {
    backgroundColor: 'transparent',
    marginLeft: wp('2%'),
    paddingVertical: hp('1.5%'),
    fontSize: hp('2%'),
  },
  note: {
    fontSize: hp('2%'),
    color: '#777',
    textAlign: 'left',
    marginVertical: hp('3%'),
  },
  categoryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
  }
});

export default observer(DoctorsByCategory);
