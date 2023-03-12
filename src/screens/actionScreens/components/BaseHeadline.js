import {View, Text, StyleSheet} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function BaseHeadline(props) {
  const {content, style, contentStyle, ...otherProps} = props;
  const onBackgroundColor = Color.light[ColorVariant.background]?.onBase;
  const containerStyle = [styles.container, style];
  const defaultContentStyle = [
    Typography.heading.small,
    {color: onBackgroundColor},
    styles.content,
    contentStyle,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      <Text style={defaultContentStyle}>{content}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  content: {
    textAlign: 'center',
  },
});
