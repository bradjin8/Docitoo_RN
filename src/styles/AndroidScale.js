import {Dimensions, NativeModules, Platform} from 'react-native';
import Config from 'react-native-config';
const hasSoftKeys =
  Platform.OS === 'Android'
    ? !!NativeModules.DetectSoftKeyModule.has_soft_keys
    : false;

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = Config.SIZE_MATTERS_BASE_WIDTH || 350;
const guidelineBaseHeight = Config.SIZE_MATTERS_BASE_HEIGHT || 680;

// The Actual Long Dimension
const actualLongDimension = longDimension - 24 - (hasSoftKeys ? 48 : 0);

const vScale = (size) => {
  return (actualLongDimension / guidelineBaseHeight) * size;
};

const scale = (size) => {
  return (shortDimension / guidelineBaseWidth) * size;
};

// Calculate VH Ratio
const vhRatio = actualLongDimension / shortDimension;

const realScale = vhRatio > 1.775 ? scale : vScale;

export default realScale;
