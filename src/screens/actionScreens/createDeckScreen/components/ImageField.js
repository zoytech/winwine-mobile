import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {WIDTH} from 'src/constants';
import {useState} from 'react';
import {SelectedPlaceholder} from '../../components';

export default function ImageField(props) {
  const {
    data,
    content,
    initialImage,
    style,
    BaseHeadlineComponent,
    onImageSelectPress = () => {},
    ...otherProps
  } = props;
  const [selectedImg, setSelectedImg] = useState(initialImage);
  const containerStyle = [styles.container, style];
  const blankImgColor = Color.light[ColorVariant.inverse]?.primary;

  function handleImageSelectPress(item) {
    onImageSelectPress(item);
    if (selectedImg === item) {
      setSelectedImg(null);
    } else {
      setSelectedImg(item);
    }
  }

  function renderImageItem(item, index) {
    return (
      <SelectedPlaceholder
        onPress={() => handleImageSelectPress(item)}
        selected={selectedImg === item}
        key={index}
        style={styles.imageOutline}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item}} />
        </View>
      </SelectedPlaceholder>
    );
  }

  function renderBaseHeadline() {
    return BaseHeadlineComponent;
  }

  return (
    <View {...otherProps} style={containerStyle}>
      <View style={styles.previewImageContainer}>
        {selectedImg ? (
          <Image source={{uri: selectedImg}} style={styles.previewImage} />
        ) : (
          <View
            style={[styles.previewImage, {backgroundColor: blankImgColor}]}
          />
        )}
      </View>
      <View style={styles.selectionContainer}>
        {renderBaseHeadline()}
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
  imageOutline: {
    width: 86,
    aspectRatio: 1,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
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
