import {View, StyleSheet, Text} from 'react-native';
import {Color, Typography} from '../../../../themes';
import {ColorVariant} from '../../../../themes';

function Icons(props) {
  const {
    initial,
    typography = Typography.body.small,
    colorVariant = ColorVariant.primary,
  } = props;
  const {base, onBase} = Color.light[colorVariant];
  const containerStyle = [styles.shape, {backgroundColor: base}];
  const textStyle = [styles.text, {color: onBase}, typography];
  return (
    <View style={containerStyle}>
      {initial && <Text style={textStyle}>{initial}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  shape: {
    width: 16,
    height: 16,
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
});

export default Icons;
