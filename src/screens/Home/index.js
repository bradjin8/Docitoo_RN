import React from 'react';
import useViewModel from './methods';
import {observer} from 'mobx-react';
import Container from '@/components/Container';
import BackgroundImage from '@/components/BackgroundImage';
import BackgroundMaskImage from '@/components/BackgroundMaskImage';
import LogoImage from '@/components/LogoImage';
import Images from "@/styles/Images";
import Colors from '@/styles/Colors';
import {scale} from '@/styles/Sizes';
import {StyleSheet, TouchableHighlight, View, Text, TouchableOpacity} from 'react-native';
import __ from '@/assets/lang';

const Home = (props) => {
  const vm = useViewModel(props);

  return (
    <Container>
      <BackgroundImage source={Images.background.mask_bg} resizeMdoe="cover" />
      <BackgroundMaskImage source={Images.background.mask_gradient} resizeMdoe="cover" />

      <View style={styles.container}>
        <View style={{marginBottom: 20 * scale}}>
          <LogoImage/>
        </View>

        <Text style={styles.description}>
          {__('app_desc')}
        </Text>
        <TouchableHighlight style={styles.whiteButton}  onPress={vm.onPressSignUp}>
          <Text style={styles.buttonLabel}>
            {__('sign_up')}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.whiteButton}  onPress={vm.onPressLogin}>
          <Text style={styles.buttonLabel}>
            {__('login')}
          </Text>
        </TouchableHighlight>
        <TouchableOpacity onPress={vm.onPressSkipSignUp}>
          <Text style={styles.whiteLabel}>
            {__('skip_sign_up')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.note}>
          {__('app_note')}
        </Text>
      </View>
    </Container>
  )
};


const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    //top: 20,
    left: 20 * scale,
    bottom: 30 * scale,
    right: 20 * scale,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonLabel: {
    color: Colors.blue2,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16 * scale
  },
  whiteButton: {
    backgroundColor: '#FFF',
    width: '90%',
    padding: 18 * scale,
    margin: 10 * scale,
    borderRadius: 5 * scale,
    alignContent: 'center'
  },
  whiteLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 20 * scale,
    fontSize: 17 * scale
  },
  description: {
    color: '#FFF',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 28 * scale,
    marginVertical: 30 * scale
  },
  note: {
    position: 'absolute',
    bottom: 25 * scale,
    color: '#FFF',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 17 * scale,
    lineHeight: 25 * scale,
  }
});

export default observer(Home);
