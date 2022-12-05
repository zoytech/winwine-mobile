import {StyleSheet} from 'react-native';

const DefaultIconButtonStyle = StyleSheet.create({
  container: {
    minWidth: 40,
    minHeight: 40,
    paddingHorizontal: 8,
    paddingVertical: 8,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    size: 24,
  },
});
export default DefaultIconButtonStyle;
