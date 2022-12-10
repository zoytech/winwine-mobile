import {Dimensions} from 'react-native';

const widthOf = {
  SCREEN: Dimensions.get('screen')?.width,
};
const heightOf = {
  SCREEN: Dimensions.get('screen')?.height,
  IMAGE: 210,
  MIN_HEADER: 64,
};

export {widthOf, heightOf};
