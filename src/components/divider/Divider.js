import {View, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function Divider(props) {
  const {style, ...otherProps} = props;
  console.log('dividerStyle: ', dividerStyle);
  return <View {...otherProps} style={[...dividerStyle, style]} />;
}

const sizes = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});

const styles = StyleSheet.create({
  borderColor: Color.light[ColorVariant.outline]?.base,
  borderWidth: 1,
});
const dividerStyle = StyleSheet.compose(sizes.fullWidth, styles);
