import {Animated, StyleSheet} from 'react-native';
import {SmallTopBar, StandardIconButton, withAnimated} from 'src/components';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {HeaderImage} from './index';

const SmallTopBarAnimated = withAnimated(SmallTopBar);
const HEADER_HEIGHT = 64;
const CONFIG_HEIGHT = 40;

function CustomTopAppBar(props, ref) {
  const {navigation, routes, content, source, style, ...otherProps} = props;
  const [showContent, setShowContent] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const bottomHeight = imageHeight + CONFIG_HEIGHT;
  const defaultAppBarHeight = bottomHeight + HEADER_HEIGHT;
  const scrollDistance = defaultAppBarHeight / 2;

  function handleShowSelectionList() {
    alert('handleShowSelectionList');
  }

  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
      if (offsetY >= defaultAppBarHeight) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    },
  }));

  const containerAnimation = {
    height: animatedValue.interpolate({
      inputRange: [0, 250],
      outputRange: [bottomHeight, 0],
      extrapolate: 'clamp',
    }),
  };

  const contentAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [250, 400],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const imageAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, defaultAppBarHeight],
          outputRange: [0, -500],
          extrapolate: 'clamp',
        }),
      },
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, imageHeight],
          outputRange: [1, 0.5],
          extrapolate: 'clamp',
        }),
      },
      {
        scaleY: animatedValue.interpolate({
          inputRange: [0, imageHeight],
          outputRange: [1, 0.5],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [imageHeight, defaultAppBarHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

  function renderRightComponents({iconStyle}) {
    return (
      <StandardIconButton
        name={'ellipsis1'}
        onPress={handleShowSelectionList}
        style={[iconStyle, styles.headerButtonIcon]}
      />
    );
  }

  function renderCenterComponents({centerStyle}) {
    const bottomStyle = [
      centerStyle,
      containerAnimation,
      {backgroundColor: 'lime'},
    ];
    const handleOnLayoutImage = event => {
      setImageHeight(event.nativeEvent.layout.height);
    };
    return (
      showContent === false && (
        <Animated.View style={bottomStyle}>
          <HeaderImage
            source={source}
            onLayoutImage={handleOnLayoutImage}
            style={imageAnimation}
          />
        </Animated.View>
      )
    );
  }

  return (
    <SmallTopBarAnimated
      {...otherProps}
      content={showContent && content}
      contentStyle={contentAnimation}
      leadingIcon={'arrowleft'}
      onLeadingIconPress={() => navigation.goBack()}
      RightComponents={renderRightComponents}
      CenterComponents={renderCenterComponents}
      style={[style]}
      topHeight={HEADER_HEIGHT}
      bottomHeight={bottomHeight}
    />
  );
}

const styles = StyleSheet.create({
  headerButtonIcon: {
    borderRadius: 20,
    minWidth: 48,
    minHeight: 48,
  },
  content: {},
});

export default forwardRef(CustomTopAppBar);
