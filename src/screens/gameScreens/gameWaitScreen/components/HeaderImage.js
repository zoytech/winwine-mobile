import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {DECK, HEIGHT} from 'src/constants';

function HeaderImage(props, ref) {
  const {
    cardDeckImage,
    children,
    style,
    onLayoutImage = () => {},
    onShowContent = () => {},
    ...otherProps
  } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [imageHeight, setImageHeight] = useState(HEIGHT?.IMAGE);

  const image = cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE;
  const halfImageHeight = imageHeight / 2;
  const reverseHeaderHeight = -HEIGHT?.MIN_HEADER;

  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;
  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
      onShowContent(event);
    },
  }));

  const imageAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, halfImageHeight, imageHeight],
          outputRange: [0, 0, reverseHeaderHeight],
          extrapolate: 'clamp',
        }),
      },
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, halfImageHeight],
          outputRange: [1, 0.75],
          extrapolate: 'clamp',
        }),
      },
      {
        scaleY: animatedValue.interpolate({
          inputRange: [0, halfImageHeight],
          outputRange: [1, 0.75],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, imageHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  const containerStyle = [
    styles.container,
    imageAnimation,
    {borderColor: imageBorderColor},
    style,
  ];

  function handleOnLayoutImage(event) {
    setImageHeight(event.nativeEvent.layout.height);
    onLayoutImage(event);
  }

  return (
    <Animated.View
      {...otherProps}
      style={containerStyle}
      onLayout={e => handleOnLayoutImage(e)}>
      <Animated.Image source={image} style={styles.image} />
    </Animated.View>
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
export default forwardRef(HeaderImage);
