import {forwardRef, useImperativeHandle, useRef} from 'react';
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
  const imageBorderColor = Color.light[ColorVariant.primary]?.onBase;

  useImperativeHandle(ref, () => ({
    onScroll: e => {
      const offsetY = e.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
    },
  }));

  const imageHeaderAnimation = {
    transform: [
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
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

  return (
    <Animated.View
      {...otherProps}
      style={containerStyle}
      onLayout={onLayoutImage}>
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
