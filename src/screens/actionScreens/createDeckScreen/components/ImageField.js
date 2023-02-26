import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {WIDTH} from 'src/constants';
import {useState} from 'react';
import ImageItem from './ImageItem';
import BaseHeadline from './BaseHeadline';

export default function ImageField(props) {
  const {
    data,
    content,
    style,
    onImageSelectPress = () => {},
    ...otherProps
  } = props;
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

  function handleChangeNewImage() {}

  function renderImageItem(item, index) {
    return (
      <ImageItem
        key={index}
        item={item}
        selected={selectedImg === item}
        onPress={() => handleImageSelectPress(item)}
      />
    );
  }

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={styles.previewImageContainer}>
        {selectedImg ? (
          <Image
            source={{uri: selectedImg}}
            onPress={handleChangeNewImage}
            style={styles.previewImage}
          />
        ) : (
          <View style={[styles.previewImage, {backgroundColor: 'coral'}]} />
        )}
      </View>
      <View style={styles.selectionContainer}>
        <BaseHeadline content={content} style={styles.headlineContainer} />
        <ScrollView
          horizontal={true}
          style={styles.imageListContainer}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.imageList}>{data.map(renderImageItem)}</View>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  previewImageContainer: {
    width: 156,
    height: '100%',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectionContainer: {
    height: '100%',
    width: WIDTH.SCREEN - 156,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 16,
  },
  headlineContainer: {
    height: 45,
  },
  imageListContainer: {
    flexDirection: 'row',
    height: '100%',
  },
  imageList: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  opacityPressed: {
    opacity: 0.75,
    color: Color.light[ColorVariant.primary]?.base,
  },
});
