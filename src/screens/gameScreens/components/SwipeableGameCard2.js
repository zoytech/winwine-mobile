import {StyleSheet} from 'react-native';
import {Carousel} from 'src/components';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import GameCardItem from './GameCardItem';

function SwipeableGameCard2(props, ref) {
  const {
    data,
    initialIndex,
    style,
    itemWidth,
    containerWidth,
    separatorWidth,
    contentStyle,
    onScrollEnd = () => {},
    ...otherProps
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const defaultContainerStyle = [styles.container, style];
  const carouselRef = useRef(null);
  // const tasksLength = data.length;

  useImperativeHandle(ref, () => ({
    scrollToCurrent: handleScrollToCurrent,
    scrollToNext: handleScrollToNext,
    scrollToPrevious: handleScrollToPrevious,
    resetIndex: handleResetIndex,
  }));

  function handleScrollToCurrent() {
    carouselRef.current.scrollToIndex(currentIndex);
  }

  function handleScrollToNext() {
    carouselRef.current.scrollToIndex(currentIndex + 1);
  }

  function handleScrollToPrevious() {
    carouselRef.current.scrollToIndex(currentIndex - 1);
  }

  function handleResetIndex() {
    carouselRef.current.scrollToIndex(initialIndex);
  }

  function handleScrollEnd(item, index) {
    setCurrentIndex(index);
    onScrollEnd && onScrollEnd(item, index);
  }

  function renderItem({item, index}) {
    return (
      <GameCardItem
        {...otherProps}
        content={item?.task}
        itemWidth={itemWidth}
        contentStyle={contentStyle}
      />
    );
  }

  return (
    <Carousel
      initialIndex={initialIndex}
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      style={defaultContainerStyle}
      itemWidth={itemWidth}
      containerWidth={containerWidth}
      onScrollEnd={handleScrollEnd}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 60,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default forwardRef(SwipeableGameCard2);
