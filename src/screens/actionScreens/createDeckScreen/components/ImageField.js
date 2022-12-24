import {Pressable, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function ImageField(props) {
  const {style, onNavigateChangeImageDialog = () => {}, ...otherProps} = props;
  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;
  const containerStyle = [
    styles.container,
    {borderColor: imageBorderColor},
    style,
  ];

  function getContainerStyle({pressed}) {
    return [containerStyle, pressed && styles.opacityPressed];
  }

  return (
    <Pressable
      {...otherProps}
      onPress={onNavigateChangeImageDialog}
      style={getContainerStyle}>
      <View style={styles.image} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '50%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor: 'violet',
  },
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});
