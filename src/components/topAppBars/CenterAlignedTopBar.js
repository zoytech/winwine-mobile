import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Color,
  ColorVariant,
  StateLayers,
  StateLayersVariant,
  Typography,
} from 'src/themes';
import {StandardIconButton} from 'src/components';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

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
    scrollingEvent,
    style,
    contentStyle,
    headerTitleStyle,
    children,
    ...otherProps
  } = props;

  const [colorChange, setColorChange] = useState(false);
  const translation = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const scrolling = event.nativeEvent.contentOffset.y;
      if (scrolling < 100) {
        setColorChange(false);
      } else {
        setColorChange(true);
      }
    },
  }));

  useEffect(() => {
    Animated.timing(translation, {
      toValue: colorChange ? 100 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [colorChange, translation]);

  const {base: surfaceColor, onBase: onSurfaceColor} =
    Color.light[ColorVariant.surface];
  const level_012 = StateLayers.light[StateLayersVariant.onSurface]?.level_012;
  const defaultContainerStyle = [
    styles.container,
    {
      backgroundColor: translation.interpolate({
        inputRange: [0, 100],
        outputRange: [surfaceColor, level_012],
      }),
    },
    style,
  ];

  const defaultContentStyle = [
    Typography.title.large,
    {color: onSurfaceColor},
    contentStyle,
  ];

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

  return (
    <Animated.View
      {...otherProps}
      style={defaultContainerStyle}
      ref={translation}>
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
  );
});
export default CenterAlignedTopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
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

/*
 {trailingLeftIcon && (
          <StandardIconButton
            name={trailingLeftIcon}
            style={styles.trailingIcon}
          />
        )}
        {trailingMiddleIcon && (
          <StandardIconButton
            name={trailingMiddleIcon}
            style={styles.trailingIcon}
          />
        )}
        {trailingRightIcon && (
          <StandardIconButton
            name={trailingRightIcon}
            style={styles.trailingIcon}
          />
        )}
 */
