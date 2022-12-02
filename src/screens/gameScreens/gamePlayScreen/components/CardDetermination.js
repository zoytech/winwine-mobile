import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Color, ColorVariant} from 'src/themes';

export default function CardDetermination(props) {
  const {
    content,
    children,
    progressBarWidth,
    indicatedPartWidth,
    style,
    contentStyle,
    ...otherProps
  } = props;
  const {base: baseColor, onBase: onBaseColor} =
    Color.light[ColorVariant.primary];
  const outlineColor = Color.light[ColorVariant.outline];
  const containerStyle = [
    styles.container,
    {
      width: progressBarWidth,
      backgroundColor: onBaseColor,
      borderColor: outlineColor,
    },
    style,
  ];
  const loadedPartStyle = [
    styles.loadedPart,
    {
      width: indicatedPartWidth,
      // borderWidth: 0.5,
      backgroundColor: baseColor,
    },
  ];
  const iconProps = {
    name: 'arrowup',
    color: outlineColor,
    size: 32,
  };

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={loadedPartStyle} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    aspectRatio: 12,
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  loadedPart: {
    height: '100%',
    position: 'absolute',
  },
});
