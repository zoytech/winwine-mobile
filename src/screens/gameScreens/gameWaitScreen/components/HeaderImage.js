import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Color, ColorVariant} from 'src/themes';

function HeaderImage(props, ref) {
  const {
    source,
    children,
    style,
    onLayoutImage = () => {},
    ...otherProps
  } = props;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [imageHeight, setImageHeight] = useState(0);
  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;

  useImperativeHandle(ref, () => ({
    onScroll: e => {
      const offsetY = e.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
    },
  }));
  console.log('imageHeight: ', imageHeight);

  const imageHeaderAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, imageHeight],
          outputRange: [1, 0],
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
    {borderColor: imageBorderColor},
    style,
    imageHeaderAnimation,
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
      <Animated.Image source={{uri: source}} style={styles.image} />
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
