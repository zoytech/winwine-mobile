import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant, Typography} from 'src/themes';

export default function InfoProgressIndicator(props) {
  const {content, style, contentStyle, children, ...otherProps} = props;
  const {base: baseColor, onBase: onBaseColor} =
    Color.light[ColorVariant.primary];
  const outlineColor = Color.light[ColorVariant.outline];
  const infoBubbleStyle = [styles.infoBubble, {backgroundColor: baseColor}];
  const defaultContentStyle = [
    contentStyle,
    Typography.label.medium,
    {color: onBaseColor},
  ];
  const iconProps = {
    name: 'down',
    color: outlineColor,
    size: 12,
  };

  return (
    <View {...otherProps} style={styles.container}>
      <View style={infoBubbleStyle}>
        {content && <Text style={defaultContentStyle}>{content}</Text>}
      </View>
      <Icon {...iconProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBubble: {
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
