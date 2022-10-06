import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export const DefaultHeaderStyle = {
  container: {
    width: width,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  leadingIcon: {
    width: width * 0.15,
    backgroundColor: 'greenyellow',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    width: width * 0.7,
  },
  subHead: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trailingIcon: {
    width: width * 0.15,
    backgroundColor: 'greenyellow',
  },
};
