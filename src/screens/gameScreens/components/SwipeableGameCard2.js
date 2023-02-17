import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {defaultOf} from 'src/constants';
import GameCardItem from './GameCardItem';
import {Carousel} from 'src/utils';

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
    onItemPress = () => {},
    ...otherProps
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const defaultContainerStyle = [styles.container, style];
  const carouselRef = useRef(null);
  const dataLength = data.length ? data.length : defaultOf.DATA_LENGTH;

  useImperativeHandle(ref, () => ({
    scrollToCurrent: handleScrollToCurrent,
    scrollToNext: handleScrollToNext,
    scrollToPrevious: handleScrollToPrevious,
    resetIndex: handleResetIndex,
  }));

  function handleScrollToCurrent() {
    carouselRef.current?.scrollToIndex(currentIndex);
  }

  function handleScrollToNext() {
    currentIndex !== dataLength - 1
      ? carouselRef.current?.scrollToIndex(currentIndex + 1)
      : carouselRef.current?.scrollToIndex(currentIndex + 2);
  }

  function handleScrollToPrevious() {
    carouselRef.current?.scrollToIndex(currentIndex - 1);
  }

  function handleResetIndex() {
    carouselRef.current?.scrollToIndex(initialIndex);
  }

  function handleScrollEnd(item, index) {
    setCurrentIndex(index);
    onScrollEnd && onScrollEnd(item, index);
  }

  function renderItem({item, index}) {
    return (
      <Pressable onPress={onItemPress}>
        <GameCardItem
          {...otherProps}
          content={item?.cardTitle}
          itemWidth={itemWidth}
          contentStyle={contentStyle}
        />
      </Pressable>
    );
  }

  return (
    <Carousel
      initialIndex={initialIndex}
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      style={defaultContainerStyle}
      contentContainerStyle={styles.contentContainer}
      itemWidth={itemWidth}
      containerWidth={containerWidth}
      separatorWidth={separatorWidth}
      onScrollEnd={handleScrollEnd}
      initialNumToRender={7}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default forwardRef(SwipeableGameCard2);
