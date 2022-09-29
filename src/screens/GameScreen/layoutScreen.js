import {Dimensions} from 'react-native';

const gameCardLayout = {
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  headline: {
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  supportingText: {
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  mainContent: {
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  action: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};
export {gameCardLayout};
