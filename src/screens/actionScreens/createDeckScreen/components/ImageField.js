import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

export default function ImageField(props) {
  const {
    data,
    style,
    onNavigateChangeImageDialog = () => {},
    ...otherProps
  } = props;
  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;
  const containerStyle = [styles.container, style];

  function getImageContainerStyle({pressed}) {
    return [
      styles.imageContainer,
      {borderColor: imageBorderColor},
      pressed && styles.opacityPressed,
    ];
  }

  function renderImageItem({item}) {
    console.log(item);
    return (
      <Pressable
        {...otherProps}
        onPress={onNavigateChangeImageDialog}
        style={getImageContainerStyle}>
        <Image style={styles.image} source={{uri: item}} />
      </Pressable>
    );
  }

  return (
    <>
      <FlatList
        {...otherProps}
        data={data}
        style={containerStyle}
        renderItem={renderImageItem}
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={<View style={styles.separator} />}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  separator: {
    width: 12,
  },
});
