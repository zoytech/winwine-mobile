import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function ValidationText(props) {
  const {content, style, contentStyle, ...otherProps} = props;
  const {base, onBase} = Color.light[ColorVariant.error];
  const containerStyle = [styles.container, style];
  const defaultContentStyle = [
    styles.content,
    {color: base},
    Typography.label.medium,
    contentStyle,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      {content && <Text style={defaultContentStyle}>{content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  content: {},
});
