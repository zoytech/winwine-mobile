import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import {Carousel, FilledCard} from 'src/components';
import {useRef} from 'react';
import {Typography} from 'src/themes';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
const SEPARATOR_WIDTH = 32;
const ITEM_WIDTH = screenWidth * 0.8;

export default function SwipeableGameCard(props) {
  const {
    data,
    taskTurn,
    style,
    itemStyle,
    contentStyle,

    onBackScroll = () => {},
    onNextScroll = () => {},
    ...otherProps
  } = props;
  const defaultContainerStyle = [styles.container, style];
  const defaultItemStyle = [styles.gameCard, itemStyle];
  console.log('taskTurn: ', taskTurn);
  const carouselRef = useRef(null);

  // function handleMovingNextItemPress() {
  //
  //   onBackScroll(currentIndex - 1);
  //   onNextScroll(currentIndex + 1);
  // }

  const renderItem = ({item}) => {
    return (
      <Pressable
        {...otherProps}
        style={styles.gameCardItem}
        onPress={() => {
          carouselRef.current.scrollToIndex(taskTurn);
        }}>
        <FilledCard {...otherProps} style={defaultItemStyle}>
          <Text style={[Typography.body.large, contentStyle]}>
            {item?.task}
          </Text>
        </FilledCard>
      </Pressable>
    );
  };
  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      style={defaultContainerStyle}
      itemWidth={ITEM_WIDTH}
      containerWidth={screenWidth}
      separatorWidth={SEPARATOR_WIDTH}
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
  },
  gameCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  text: {
    textAlign: 'center',
  },
});
