import {Image, Pressable, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function ImageItem(props) {
  const {item, style, selected = false, ...otherProps} = props;
  const {base: selectedBorderColor, onBase: normBorderColor} =
    Color.light[ColorVariant.primary];

  function getImageContainerStyle({pressed}) {
    return [
      styles.imageContainer,
      {
        borderColor: selected ? selectedBorderColor : normBorderColor,
        borderWidth: selected ? 3 : 0.5,
      },
      pressed && styles.opacityPressed,
      style,
    ];
  }

  return (
    <Pressable {...otherProps} style={getImageContainerStyle}>
      <Image style={styles.image} source={{uri: item}} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 86,
    aspectRatio: 1,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});
