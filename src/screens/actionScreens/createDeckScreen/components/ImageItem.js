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
    width: 120,
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
  },
  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});
