import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {StandardIconButton} from 'src/components';

const MAIN_HEIGHT = 64;
const CONFIG_VALUE = 100;
const CenterAlignedTopBar = forwardRef(function CenterAlignedTopBar(
  props,
  ref,
) {
  const {
    content,
    leadingIcon,
    onLeadingIconPress = () => {},
    trailingIcon,
    onTrailingIconPress = () => {},
    style,
    contentStyle,
    headerTitleStyle,
    children,
    ...otherProps
  } = props;

  const scrollYContentOffsetRef = useRef(new Animated.Value(0)).current;
  const [subHeight, setSubHeight] = useState(0);
  const totalHeight = subHeight + MAIN_HEIGHT;
  const SCROLL_DISTANCE = totalHeight - MAIN_HEIGHT + CONFIG_VALUE;

  useImperativeHandle(ref, () => ({
    onScroll: e => {
      const offsetY = e.nativeEvent.contentOffset.y;
      scrollYContentOffsetRef.setValue(offsetY);
    },
  }));

  const {base: surfaceColor, onBase: onSurfaceColor} =
    Color.light[ColorVariant.surface];
  const baseColor = Color.light[ColorVariant.secondary]?.container;
  const topBarAnimation = {
    backgroundColor: scrollYContentOffsetRef.interpolate({
      inputRange: [0, SCROLL_DISTANCE],
      outputRange: [surfaceColor, baseColor],
      extrapolate: 'clamp',
    }),
    height: scrollYContentOffsetRef.interpolate({
      inputRange: [0, SCROLL_DISTANCE],
      outputRange: [totalHeight, subHeight],
      extrapolate: 'clamp',
    }),
  };
  const mainTopBarAnimation = {
    transform: [
      {
        translateY: scrollYContentOffsetRef.interpolate({
          inputRange: [0, SCROLL_DISTANCE],
          outputRange: [0, -MAIN_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const subTopBarAnimation = {
    transform: [
      {
        translateY: scrollYContentOffsetRef.interpolate({
          inputRange: [0, SCROLL_DISTANCE],
          outputRange: [0, -MAIN_HEIGHT],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const defaultContainerStyle = [styles.container, topBarAnimation, style];

  const defaultContentStyle = [
    Typography.title.large,
    {color: onSurfaceColor},
    contentStyle,
  ];
  const mainTopBarStyle = [styles.mainTopBar, mainTopBarAnimation];
  const subTopBarStyle = [styles.mainTopBar, subTopBarAnimation];

  function renderImagePressable(avatar) {
    const getPressStyle = ({pressed}) => {
      return pressed
        ? [styles.targetSize, styles.opacityPressed]
        : styles.targetSize;
    };
    return (
      <Pressable style={getPressStyle} onPress={onTrailingIconPress}>
        <Image source={avatar} style={styles.avatarIcon} />
      </Pressable>
    );
  }

  function renderChildren() {
    const handleOnlayoutOfChild = event => {
      setSubHeight(event.nativeEvent.layout.height);
    };
    return (
      <Animated.View
        style={subTopBarStyle}
        onLayout={event => handleOnlayoutOfChild(event)}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.ScrollView {...otherProps} style={defaultContainerStyle}>
      <Animated.View style={mainTopBarStyle}>
        {leadingIcon && (
          <View style={styles.targetSize}>
            <StandardIconButton
              name={leadingIcon}
              onPress={onLeadingIconPress}
              style={styles.icon}
            />
          </View>
        )}
        <View style={[headerTitleStyle, styles.title]}>
          <Text style={defaultContentStyle}>{content}</Text>
        </View>
        {renderImagePressable(trailingIcon)}
      </Animated.View>
      {renderChildren()}
    </Animated.ScrollView>
  );
});
export default CenterAlignedTopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  item: {
    justifyContent: 'flex-start',
  },
  mainTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: MAIN_HEIGHT,
  },
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingLeft: 16,
  },
  avatarIcon: {
    borderRadius: 15,
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  opacityPressed: {
    opacity: 0.5,
  },
});
