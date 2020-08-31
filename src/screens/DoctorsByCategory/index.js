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
import Separator from "@/components/Separator";
import useViewModel from './methods';
import ImageButton from "@/components/Button/ImageButton";
import GreyInput from "@/components/Input/GreyInput";
import Icon from "react-native-vector-icons/FontAwesome5";

const ShareModeDetails = (props) => {
  const vm = useViewModel(props);

  return (
    <BoardWithHeader title={__('doctors')}>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <Icon name={'search'} size={20} color={Colors.grey}/>
          <TextInput style={styles.searchInput} value={vm.searchString} placeholder={__('search_for_doctors')}
                     onChangeText={(val) => vm.setSearchString(val)}/>
        </View>
        <Space height={20 * scale}/>
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
          <CategoryButton image={Images.category.orthopedic} caption={__('orthopedic_surgeon')} onPress={vm.onPressOrthopedic}/>
        </View>
        <View style={styles.categoryLine}>
          <CategoryButton image={Images.category.ent} caption={__('ent_specialist')}
                          onPress={vm.onPressENT}/>
          <CategoryButton image={Images.category.diagnostics} caption={__('diagnostics')} onPress={vm.onPressDiagnostics}/>
        </View>
        <View style={styles.categoryLine}>
          <CategoryButton image={Images.category.diabetes} caption={__('diabetes_specialist')}
                          onPress={vm.onPressDiabetes}/>
          <CategoryButton image={Images.category.eye} caption={__('eye_specialist')} onPress={vm.onPressEye}/>
        </View>
        <Space height={100 * scale}/>
      </ScrollView>
    </BoardWithHeader>
  )
};

export const CategoryButton = ({image, caption, onPress}) => {
  const windowWidth = Dimensions.get('window').width;
  const buttonWidth = windowWidth / 2 - 50;
  const imageWidth = buttonWidth / 2.5;

  const cbStyles = StyleSheet.create({
    container: {
      width: buttonWidth,
      height: buttonWidth,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      elevation: 10,
      shadowColor: Colors.grey_dark,
      shadowRadius: 6,
      shadowOpacity: 0.8,
      backgroundColor: '#fff',
      paddingTop: 20 * scale,
    },
    caption: {
      color: Colors.grey_dark,
      fontWeight: 'bold',
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
    width: '90%',
    flexDirection: 'column',
    height: '92%',
    // backgroundColor: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.grey_light,
    borderRadius: 10 * scale,
    alignItems: 'center',
    paddingHorizontal: 10 * scale,
    // position: 'absolute',
    width: '100%',
    top: Platform.OS === 'ios' ? 20 * scale : 20 * scale,
    zIndex: 50
  },
  searchInput: {
    backgroundColor: 'transparent',
    marginLeft: 10 * scale,
    paddingVertical: 10 * scale,
  },
  note: {
    fontSize: 18 * scale,
    color: '#aaa',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 20 * scale,
    marginVertical: 20 * scale,
  },
  categoryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20 * scale,
  }
});

export default observer(ShareModeDetails);
