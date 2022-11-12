import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';

export default function TagName(props) {
  const {content, icon, style, contentStyle, iconStyle} = props;
  const onBase = Color.light[ColorVariant.surface]?.onBase;
  const iconProps = {
    name: icon ? icon : 'tago',
    size: 12,
    color: onBase,
    style: styles.icon,
    ...iconStyle,
  };
  const defaultContainerStyle = [styles.container, style];
  return (
    <View style={defaultContainerStyle}>
      <Icon {...iconProps} />
      {content && <Text style={contentStyle}>{content}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 10,
  },
});
