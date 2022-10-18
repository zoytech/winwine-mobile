import {StyleSheet} from 'react-native';

const defaultButtonStyle = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    minWidth: 70,
    minHeight: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});
export default defaultButtonStyle;
