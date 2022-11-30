import {Animated, StyleSheet} from 'react-native';
import {SmallTopBar, StandardIconButton, withAnimated} from 'src/components';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const SmallTopBarAnimated = withAnimated(SmallTopBar);

function CustomTopAppBar(props, ref) {
  const {
    navigation,
    routes,
    content,
    scrollDistance,
    style,
    contentStyle,
    ...otherProps
  } = props;
  const [showContent, setShowContent] = useState(false);
  const [topAppBarHeight, setTopAppBarHeight] = useState(0);
  const [distance, setDistance] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    setDistance(scrollDistance + topAppBarHeight);
  }, [scrollDistance, topAppBarHeight]);
  console.log('distance: ', distance);

  function handleShowSelectionList() {
    alert('handleShowSelectionList');
  }

  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
      if (offsetY >= distance) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    },
  }));

  const contentAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [distance, 350],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  function handleOnLayoutTopAppBar(event) {
    setTopAppBarHeight(event.nativeEvent.layout.height);
  }

  function renderRightComponents({iconStyle}) {
    return (
      <StandardIconButton
        name={'ellipsis1'}
        onPress={handleShowSelectionList}
        style={[iconStyle, styles.headerButtonIcon]}
      />
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
      style={[style]}
      onLayoutTopAppBar={handleOnLayoutTopAppBar}
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
  image: {},
});

export default forwardRef(CustomTopAppBar);
