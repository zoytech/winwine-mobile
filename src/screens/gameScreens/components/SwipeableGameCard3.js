import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('screen')?.width;

function SwipeableGameCard3(props, ref) {
  const {
    data,
    renderItem,
    style,
    itemWidth = screenWidth,
    onScrollEnd = () => {},
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef({index: 0});
  const scrollViewRef = useRef(null);
  currentIndexRef.current = currentIndex;
  const defaultContainerStyle = [styles.container, style];
  useImperativeHandle(ref, () => ({
    scrollToIndex: scrollToIndex,
  }));
  const onScroll = useCallback(event => {
    getIndexAccordingToScrollDistance(event);
  }, []);

  // function getItemOffset(index) {
  //   return index * itemWidth;
  // }

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    listKey: true,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: itemWidth,
        offset: index * itemWidth, //getItemOffset
      }),
      [itemWidth],
    ),
  };

  function scrollToIndex(index) {
    if (index < 0 || index >= data.length) {
      return;
    }
    onScrollEnd && onScrollEnd(data[index], index);
    currentIndexRef.current = index;
    setTimeout(() => {
      scrollViewRef.current &&
        scrollViewRef.current.scrollToOffset({
          offset: index * itemWidth,
          animated: true,
        });
    });
  }

  function getIndexAccordingToScrollDistance(event) {
    const itemSize = event.nativeEvent.layoutMeasurement.width;
    const indexByDistance = event.nativeEvent.contentOffset.x / itemSize;
    const roundIndex = Math.round(indexByDistance);
    const distance = Math.abs(roundIndex - indexByDistance);
    const isNoMansLand = distance < 0.4;
    if (roundIndex !== currentIndexRef.current && !isNoMansLand) {
      setCurrentIndex(roundIndex);
    }
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={defaultContainerStyle}
      onScroll={onScroll}
      ref={scrollViewRef}
      {...flatListOptimizationProps}
    />
  );
}

export default forwardRef(SwipeableGameCard3);

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
