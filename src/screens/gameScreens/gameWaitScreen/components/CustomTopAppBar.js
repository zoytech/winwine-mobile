import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {SmallTopBar, StandardIconButton, withAnimated} from 'src/components';

const SmallTopBarAnimated = withAnimated(SmallTopBar);
const HEADER_HEIGHT = 64;
const CONFIG_HEIGHT = 50;

function CustomTopAppBar(props, ref) {
  const {
    navigation,
    routes,
    content,
    imageHeight,
    source,
    style,
    ...otherProps
  } = props;
  const [showContent, setShowContent] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const bottomHeight = imageHeight + CONFIG_HEIGHT;

  function handleShowSelectionList() {
    alert('handleShowSelectionList');
  }

  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
      if (offsetY >= imageHeight) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    },
  }));

  const contentAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [bottomHeight, bottomHeight + CONFIG_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  return (
    <SmallTopBarAnimated
      {...otherProps}
      content={showContent && content}
      contentStyle={contentAnimation}
      leadingIcon={'arrowleft'}
      onLeadingIconPress={() => navigation.goBack()}
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
