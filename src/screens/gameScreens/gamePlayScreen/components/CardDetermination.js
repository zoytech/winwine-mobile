import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

const screenWidth = Dimensions.get('screen')?.width;

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
  const defaultContainerStyle = [styles.container, style];
  const progressBarStyle = [
    styles.progressBar,
    {
      width: progressBarWidth,
      backgroundColor: onBaseColor,
      borderColor: outlineColor,
    },
  ];
  const loadedPartStyle = [
    styles.loadedPart,
    {
      width: indicatedPartWidth,
      backgroundColor: baseColor,
    },
  ];

  return (
    <Pressable {...otherProps} style={defaultContainerStyle}>
      {children}
      <View style={progressBarStyle}>
        <View style={loadedPartStyle} />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', //column direction
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    aspectRatio: 12,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  loadedPart: {
    height: '100%',
    position: 'absolute',
  },
});
