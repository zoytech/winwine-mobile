import {StyleSheet, Text, View} from 'react-native';
import {Color, Typography} from '../../themes';
import {ColorVariant} from '../../themes/color';

export default function AvatarDefault(props) {
  const {
    typography = Typography.title.medium,
    colorVariant = ColorVariant.primary,
    children,
    content,
    ...otherComponent
  } = props;

  const {base, onBase} = Color.light[colorVariant];
  const containerStyle = [styles.container, {backgroundColor: base}];
  const textStyle = [styles.text, {color: onBase}, typography];
  return (
    <View {...otherComponent} style={containerStyle}>
      {content && <Text style={textStyle}>{content}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
