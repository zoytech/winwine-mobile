import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

function SwipeableGameCard3(props, ref) {
  const {
    data,
    renderItem,
    initialIndex,
    style,
    itemWidth,
    containerWidth,
    separatorWidth,
    onScrollEnd = () => {},
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentIndexRef = useRef(initialIndex);
  const scrollViewRef = useRef(null);
  currentIndexRef.current = currentIndex;
  const defaultContainerStyle = [
    styles.container,
    {paddingHorizontal: separatorWidth},
    style,
  ];
  useImperativeHandle(ref, () => ({
    scrollToIndex: scrollToIndex,
  }));
  const onScroll = useCallback(event => {
    getIndexAccordingToScrollDistance(event);
  }, []);

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
      ItemSeparatorComponent={
        <View style={{width: separatorWidth * 2, backgroundColor: 'red'}} />
      }
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
});
