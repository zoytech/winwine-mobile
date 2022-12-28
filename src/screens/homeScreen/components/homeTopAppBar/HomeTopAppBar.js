import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {CenterTopBar, SpinnerType1} from 'src/components';
import {heightOf} from 'src/constants';
import {SuggestionList} from '../suggestionList';
import {usePartOfDay, withAnimated} from 'src/utils';
import {AvatarSettingButton} from '../../../components';

const CONFIG_VALUE = 100;
const standardHeight = heightOf?.MIN_HEADER;
const AnimatedCenterTopBar = withAnimated(CenterTopBar);

function HomeTopAppBar(props, ref) {
  const {navigation, style, ...otherProps} = props;
  const {currentPart} = usePartOfDay();

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

  const topBarComponentAnimation = {
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

  const topBarAnimation = {
    height: scrollYContentOffsetRef.interpolate({
      inputRange: [0, scrollDistance],
      outputRange: [totalHeight, subHeight],
      extrapolate: 'clamp',
    }),
  };

  const defaultContainerStyle = [styles.container, topBarAnimation, style];

  function handleOnlayoutOfChild(event) {
    setSubHeight(event.nativeEvent.layout.height);
  }

  function renderRightComponents() {
    return (
      <AvatarSettingButton
        navigation={navigation}
        style={[styles.targetSize, styles.avatarDisplay]}
      />
    );
  }

  function renderBottomComponents() {
    return <SuggestionList navigation={navigation} style={styles.suggestion} />;
  }

  return (
    <AnimatedCenterTopBar
      {...otherProps}
      style={defaultContainerStyle}
      content={currentPart.greetingContent}
      headerTitleStyle={styles.headerTitle}
      RightComponents={renderRightComponents}
      componentStyle={topBarComponentAnimation}
      onLayoutOfBottomComponent={handleOnlayoutOfChild}>
      {renderBottomComponents()}
    </AnimatedCenterTopBar>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerTitle: {
    justifyContent: 'flex-start',
  },
  suggestion: {},
  avatarDisplay: {
    marginRight: 6,
  },
});
export default forwardRef(HomeTopAppBar);
