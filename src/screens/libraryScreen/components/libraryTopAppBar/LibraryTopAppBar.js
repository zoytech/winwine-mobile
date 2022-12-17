import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {
  BaseAvatarButton,
  CenterTopBar,
  StandardIconButton,
} from 'src/components';
import {defaultOfUser, heightOf} from 'src/constants';
import TagChipList from './TagChipList';
import {withAnimated} from 'src/utils';

const AnimatedCenterTopBar = withAnimated(CenterTopBar);
const CONFIG_VALUE = 100;
const standardHeight = heightOf?.MIN_HEADER;
const MAIN_TITLE = 'Thư viện của tôi';

function LibraryTopAppBar(props, ref) {
  const {
    navigation,
    data,
    chipId,
    style,
    onSortingListByChipId = () => {},
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

  function renderRightComponents() {
    const handleSearchPressed = () => {
      console.log('handleSearchPressed: ');
    };
    const handleCreatePressed = () => {
      console.log('handleCreatePressed: ');
    };
    const iconProps = {
      style: styles.targetSize,
      iconStyle: {size: 30},
    };
    return (
      <View style={styles.buttonContainer}>
        <StandardIconButton
          name={'search1'}
          onPress={handleSearchPressed}
          {...iconProps}
        />
        <StandardIconButton
          name={'plus'}
          onPress={handleCreatePressed}
          {...iconProps}
        />
      </View>
    );
  }

  function handleOnlayoutOfChild(event) {
    setSubHeight(event.nativeEvent.layout.height);
  }

  function renderBottomComponents() {
    return (
      <TagChipList
        data={data}
        navigation={navigation}
        style={styles.suggestion}
        onSortingListByChipId={id => onSortingListByChipId(id)}
        chipId={chipId}
      />
    );
  }

  function renderLeftComponent() {
    const handleAvatarPressed = () => {
      console.log('handleAvatarPressed: ');
    };
    return (
      <BaseAvatarButton
        avatar={defaultOfUser?.AVATAR}
        style={[styles.targetSize, styles.avatarDisplay]}
        onPress={handleAvatarPressed}
      />
    );
  }

  return (
    <AnimatedCenterTopBar
      {...otherProps}
      style={defaultContainerStyle}
      content={MAIN_TITLE}
      contentStyle={styles.headerTitle}
      headerTitleStyle={styles.headerTitleContainer}
      LeftComponent={renderLeftComponent}
      RightComponents={renderRightComponents}
      componentStyle={topBarComponentAnimation}
      onLayoutOfBottomComponent={handleOnlayoutOfChild}>
      {renderBottomComponents()}
    </AnimatedCenterTopBar>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerTitleContainer: {
    width: '55%',
    paddingLeft: 0,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  suggestion: {
    height: standardHeight,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDisplay: {
    marginLeft: 8,
  },
});
export default forwardRef(LibraryTopAppBar);
