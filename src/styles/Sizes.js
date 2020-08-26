import realScale from './AndroidScale';
import {Platform} from 'react-native';

const Sizes = {
  avatar: 76
};

export const scale = Platform.OS === 'ios'? 1 : 0.8;
export const headerHeight = Platform.OS === 'ios' ? 80 : 60;

export default Sizes;
