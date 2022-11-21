import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import {Carousel, FilledCard} from 'src/components';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Typography} from 'src/themes';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const separatorWidth = 32;
const itemWidth = screenWidth;

function SwipeableGameCard2(props, ref) {
  const {
    data,
    initialIndex,
    style,
    itemStyle,
    contentStyle,
    onItemPress = () => {},
    onScrollEnd = () => {},
    ...otherProps
  } = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const defaultContainerStyle = [styles.container, style];
  const defaultItemStyle = [styles.gameCard, itemStyle];
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
    carouselRef.current.scrollToIndex(0);
  }

  function handleScrollEnd(item, index) {
    setCurrentIndex(index);
    onScrollEnd && onScrollEnd(item, index);
  }

  function renderItem({item, index}) {
    return (
      <Pressable
        style={styles.gameCardItem}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
          onItemPress && onItemPress(item, index);
        }}>
        <FilledCard {...otherProps} style={defaultItemStyle}>
          <Text style={[Typography.body.large, contentStyle]}>
            {item?.task}
          </Text>
        </FilledCard>
      </Pressable>
    );
  }

  return (
    <Carousel
      initialIndex={initialIndex}
      ref={carouselRef}
      data={data}
      inActiveScale={1}
      renderItem={renderItem}
      style={defaultContainerStyle}
      itemWidth={itemWidth}
      containerWidth={screenWidth}
      separatorWidth={separatorWidth}
      onScrollEnd={handleScrollEnd}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight * 0.7,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameCardItem: {
    justifyContent: 'center',
    backgroundColor: 'yellow',
    // alignSelf: 'center',
  },
  gameCard: {
    width: itemWidth * 0.8,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: 'coral',
  },
  text: {
    textAlign: 'center',
  },
});

export default forwardRef(SwipeableGameCard2);
