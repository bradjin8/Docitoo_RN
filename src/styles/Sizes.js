import realScale from './AndroidScale';
import {Platform, Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const Sizes = {
  avatar: 76
};

const factor = windowHeight / 760;

export const scale = Platform.OS === 'ios'? 1 : 0.8 * factor;
export const headerHeight = Platform.OS === 'ios' ? 80 : 40 * scale;

export default Sizes;
