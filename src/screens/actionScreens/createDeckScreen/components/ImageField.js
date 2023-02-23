import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {useState} from 'react';
import ImageItem from './ImageItem';

export default function ImageField(props) {
  const {data, style, onImageSelectPress = () => {}, ...otherProps} = props;
  const [selectedImg, setSelectedImg] = useState('');
  const containerStyle = [styles.container, style];

  function handleImageSelectPress(item) {
    onImageSelectPress(item);
    if (selectedImg === item) {
      setSelectedImg(null);
    } else {
      setSelectedImg(item);
    }
  }

  function renderImageItem({item}) {
    return (
      <ImageItem
        item={item}
        selected={selectedImg === item}
        onPress={() => handleImageSelectPress(item)}
      />
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
