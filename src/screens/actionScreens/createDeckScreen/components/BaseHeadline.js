import {View, Text, StyleSheet} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function BaseHeadline(props) {
  const {content, style, contentStyle, ...otherProps} = props;
  const onBasePrimary = Color.light[ColorVariant.primary]?.onBase;
  const containerStyle = [styles.container, style];
  const defaultContentStyle = [
    styles.content,
    {color: onBasePrimary},
    Typography.title.medium,
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
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
  },
});
