import {Dimensions, StatusBar} from 'react-native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const statusBarHeight = StatusBar?.currentHeight || 24;
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const WIDTH = {
  SCREEN: screenWidth,
};
const HEIGHT = {
  SCREEN: screenHeight,
  STATUS_BAR: statusBarHeight,
  WINDOW: windowHeight,
  BOTTOM_BAR: screenHeight - statusBarHeight - windowHeight,
  IMAGE: 210,
  MIN_HEADER: 64,
};

export {WIDTH, HEIGHT};
