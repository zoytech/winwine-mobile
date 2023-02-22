import {StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function ValidationText(props) {
  const {content, style, contentStyle, ...otherProps} = props;
  const {base, onBase} = Color.light[ColorVariant.error];
  const containerStyle = [styles.container, style];
  const defaultContentStyle = [
    styles.content,
    {color: onBase},
    Typography.label.medium,
    contentStyle,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      <Text style={defaultContentStyle}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {},
});
