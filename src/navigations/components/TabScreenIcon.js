import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';

export default function TabScreenIcon(props) {
  const {focused, name, size} = props;
  const {container: secondColor, onContainer: onSecondColor} =
    Color.light[ColorVariant.secondary];
  const onSurVarColor = Color.light[ColorVariant.surfaceVariant]?.onBase;

  const indicatorStyle = [
    styles.activeIndicator,
    {backgroundColor: focused && secondColor},
  ];
  const iconProps = {
    name: name ? name : 'arrow',
    size: size ? size : 26,
    color: focused ? onSecondColor : onSurVarColor,
  };
  return (
    <View style={indicatorStyle}>
      <Icon {...iconProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  activeIndicator: {
    width: 64,
    aspectRatio: 2,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
