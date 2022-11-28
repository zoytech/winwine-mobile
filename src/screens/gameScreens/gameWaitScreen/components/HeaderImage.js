import {Image, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function HeaderImage(props) {
  const {source, children, style, ...otherProps} = props;
  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;
  const containerStyle = [
    styles.container,
    {borderColor: imageBorderColor},
    style,
  ];
  return (
    <View {...otherProps} style={containerStyle}>
      <Image source={{uri: source}} style={styles.image} />
    </View>
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
  },
});
