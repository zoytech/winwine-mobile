import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {SmallTopBar} from 'src/components';
import {heightOf} from 'src/constants';
import {withAnimated} from 'src/utils';

const SmallTopBarAnimated = withAnimated(SmallTopBar);
const CONFIG_VALUE = 100;

function CreateCardTopBar(props, ref) {
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
  const minHeight = heightOf?.MIN_HEADER;
  const imgHeight = imageHeight ? imageHeight : heightOf?.IMAGE;
  const bottomHeight = imgHeight + minHeight;

  function handleShowSelectionList() {
    alert('handleShowSelectionList');
  }

  useImperativeHandle(ref, () => ({
    onScroll: event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      animatedValue.setValue(offsetY);
      if (offsetY >= imgHeight) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    },
  }));

  const contentAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [imgHeight, imgHeight + CONFIG_VALUE],
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
      topHeight={minHeight}
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

export default forwardRef(CreateCardTopBar);
