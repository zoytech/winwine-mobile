import {StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import GameCardItem from './GameCardItem';

function SwipeableGameCard(props, ref) {
  const {
    data,
    initialIndex,
    style,
    itemWidth,
    containerWidth,
    separatorWidth,
    contentStyle,
    onSnapToItem = () => {},
    ...otherProps
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const defaultContainerStyle = [styles.container, style];
  const carouselRef = useRef(null);

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

  function handleSnapToItem(index) {
    setCurrentIndex(index);
    onSnapToItem && onSnapToItem(index);
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
      {...otherProps}
      ref={carouselRef}
      initialNumToRender={initialIndex}
      data={data}
      renderItem={renderItem}
      style={defaultContainerStyle}
      itemWidth={itemWidth}
      sliderWidth={containerWidth}
      onSnapToItem={handleSnapToItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    aspectRatio: 0.85,
    paddingHorizontal: 32,
    borderWidth: 0.5,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 32,
  },
  gameCard: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default forwardRef(SwipeableGameCard);

/*
 <ScrollView
      {...otherProps}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      decelerationRate={'fast'}
      disableIntervalMomentum={true}>
      <FilledCard {...otherProps} style={styles.gameCard}>
        <Text style={[Typography.body.large, styles.text, contentStyle]}>
          {data[taskTurn]?.task}
        </Text>
      </FilledCard>
      <FilledCard {...otherProps} style={styles.gameCard}>
        <Text style={[Typography.body.large, contentStyle]}>
          {data[taskTurn]?.task}
        </Text>
      </FilledCard>
    </ScrollView>
 */
