import {Dimensions} from 'react-native';

const WIDTH = {
  SCREEN: Dimensions.get('screen')?.width,
};
const HEIGHT = {
  SCREEN: Dimensions.get('screen')?.height,
  IMAGE: 210,
  MIN_HEADER: 64,
};

export {WIDTH, HEIGHT};
