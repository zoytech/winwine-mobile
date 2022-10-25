import {View, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function Divider(props) {
  const {size, ...otherProps} = props;
  return <View {...otherProps} style={[dividerStyle, size]} />;
}

const sizes = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});

const styles = StyleSheet.create({
  borderColor: Color.light[ColorVariant.outline]?.base,
  borderWeight: 1,
});
const dividerStyle = StyleSheet.compose(sizes.fullWidth, styles);
