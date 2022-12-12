import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Color, ColorVariant, Typography} from 'src/themes';
import {BaseAvatarButton, StandardIconButton} from 'src/components';
import {heightOf} from 'src/constants';

const CONFIG_VALUE = 100;
const standardHeight = heightOf?.MIN_HEADER;

function CenterTopBar(props, ref) {
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
  const reverseStandardHeight = -standardHeight;
  const scrollYContentOffsetRef = useRef(new Animated.Value(0)).current;
  const [subHeight, setSubHeight] = useState(0);
  const totalHeight = subHeight + standardHeight;
  const scrollDistance = totalHeight - standardHeight + CONFIG_VALUE;

  useImperativeHandle(ref, () => ({
    onScroll: e => {
      const offsetY = e.nativeEvent.contentOffset.y;
      scrollYContentOffsetRef.setValue(offsetY);
    },
  }));

  const {base: background, onBase: onBackground} =
    Color.light[ColorVariant.background];
  const topBarAnimation = {
    height: scrollYContentOffsetRef.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [totalHeight, subHeight],
      extrapolate: 'clamp',
    }),
  };
  const mainTopBarAnimation = {
    transform: [
      {
        translateY: scrollYContentOffsetRef.interpolate({
          inputRange: [0, scrollDistance],
          outputRange: [0, reverseStandardHeight],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
  const subTopBarAnimation = {
    transform: [
      {
        translateY: scrollYContentOffsetRef.interpolate({
          inputRange: [0, scrollDistance],
          outputRange: [0, reverseStandardHeight],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const defaultContainerStyle = [
    styles.container,
    {backgroundColor: background},
    topBarAnimation,
    style,
  ];

  const defaultContentStyle = [
    Typography.title.large,
    {color: onBackground},
    contentStyle,
  ];
  const mainTopBarStyle = [styles.mainTopBar, mainTopBarAnimation];
  const subTopBarStyle = [styles.mainTopBar, subTopBarAnimation];

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
        <BaseAvatarButton
          avatar={trailingIcon}
          onPress={onTrailingIconPress}
          style={styles.targetSize}
          avatarStyle={styles.avatarIcon}
        />
      </Animated.View>
      {renderChildren()}
    </Animated.ScrollView>
  );
}

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
    height: standardHeight,
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
  },
});

export default forwardRef(CenterTopBar);
