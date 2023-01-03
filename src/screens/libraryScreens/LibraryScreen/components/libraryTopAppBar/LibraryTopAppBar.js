import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CenterTopBar, SpinnerType1} from 'src/components';
import {HEIGHT} from 'src/constants';
import {withAnimated} from 'src/utils';
import {AvatarSettingButton} from 'src/screens/components';
import TagChipList from './components/TagChipList';
import {CreateButton, SearchButton} from './components';
import {hashtagsSelector} from '../../../../../redux/selectors';
import {loadHashtags} from 'src/redux/actions';

const AnimatedCenterTopBar = withAnimated(CenterTopBar);
const CONFIG_VALUE = 100;
const standardHeight = HEIGHT?.MIN_HEADER;
const MAIN_TITLE = 'Thư viện của tôi';

function LibraryTopAppBar(props, ref) {
  const {
    navigation,
    chipId,
    style,
    onSortingListByChipId = () => {},
    ...otherProps
  } = props;
  const dispatch = useDispatch();
  const hashtags = useSelector(hashtagsSelector);

  const reverseStandardHeight = -standardHeight;
  const scrollYContentOffsetRef = useRef(new Animated.Value(0)).current;
  const [subHeight, setSubHeight] = useState(0);
  const totalHeight = subHeight + standardHeight;
  const scrollDistance = totalHeight - standardHeight + CONFIG_VALUE;
  const userToken = 'uuid123';
  useEffect(() => {
    dispatch(loadHashtags());
  }, [dispatch]);

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
      <View style={styles.rightButtons}>
        <SearchButton navigation={navigation} style={styles.targetSize} />
        <CreateButton
          navigation={navigation}
          style={styles.targetSize}
          userToken={userToken}
        />
      </View>
    );
  }

  function renderBottomComponents() {
    return (
      <TagChipList
        data={hashtags}
        navigation={navigation}
        style={styles.suggestion}
        onSortingListByChipId={onSortingListByChipId}
      />
    );
  }

  function renderLeftComponent() {
    return (
      <AvatarSettingButton
        navigation={navigation}
        style={[styles.targetSize, styles.avatarDisplay]}
      />
    );
  }

  if (!hashtags) {
    return <SpinnerType1 />;
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
  avatarDisplay: {
    marginLeft: 8,
  },
  targetSize: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
  iconStyle: {size: 30},
});
export default forwardRef(LibraryTopAppBar);
