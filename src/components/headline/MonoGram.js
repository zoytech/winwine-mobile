import {StyleSheet, View} from 'react-native';
import {TextContent} from '../content';
import {Color, Typography} from '../../themes';
import {ColorVariant} from '../../themes/color';

function MonoGram(props) {
  const {
    initial,
    typography = Typography.title.medium,
    colorVariant = ColorVariant.primary,
  } = props;

  const {base, onBase} = Color.light[colorVariant];
  const containerStyle = [styles.shape, {backgroundColor: base}];
  const textStyle = [styles.text, {color: onBase}, typography];
  return (
    <View style={styles.container}>
      <View style={containerStyle}>
        {initial ? (
          <TextContent content={initial} contentStyle={textStyle} />
        ) : (
          <TextContent content={'?'} contentStyle={textStyle} />
        )}
      </View>
    </View>
  );
}

export default MonoGram;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shape: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
});
