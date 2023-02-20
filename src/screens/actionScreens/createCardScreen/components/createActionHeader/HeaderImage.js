import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';
import {HEIGHT} from 'src/constants';

function HeaderImage(props, ref) {
  const {
    source,
    children,
    style,
    onLayoutImage = () => {},
    onShowContent = () => {},
    ...otherProps
  } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;
  const [imageHeight, setImageHeight] = useState(HEIGHT?.IMAGE);
  const halfImageHeight = imageHeight / 2;
  const reverseHeaderpHeight = -HEIGHT?.MIN_HEADER;
  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
      // offsetY > imageHeight && event.preventDefault();
      onShowContent(event);
    },
  }));

  const imageAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, halfImageHeight, imageHeight],
          outputRange: [0, 0, reverseHeaderpHeight],
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
      <Animated.Image source={source} style={styles.image} />
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
