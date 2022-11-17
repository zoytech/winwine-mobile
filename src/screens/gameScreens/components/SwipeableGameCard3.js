import {useCallback, useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet, View} from 'react-native';
import GameCardItem from './GameCardItem';

const screenWidth = Dimensions.get('screen')?.width;

export default function SwipeableGameCard3(props) {
  const {
    data,
    taskTurn,
    style,
    itemStyle,
    itemWidth = screenWidth * 0.8,
    centerAlign = (screenWidth - itemWidth) / 2,
    contentStyle,
    ...otherProps
  } = props;
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const defaultContainerStyle = [
    styles.container,
    {
      backgroundColor: 'gold',
    },
    style,
  ];
  const defaultItemStyle = [
    styles.item,
    {
      width: screenWidth,
      paddingHorizontal: centerAlign,
      borderColor: 'green',
      borderWidth: 0.5,
    },
    itemStyle,
  ];
  const onScroll = useCallback(event => {
    getIndexAccordingToScrollDistance(event);
  }, []);
  useEffect(() => {
    console.log('index: ', index);
  }, [index]);

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
        length: screenWidth,
        offset: index * screenWidth,
      }),
      [],
    ),
  };

  function getIndexAccordingToScrollDistance(event) {
    const itemSize = event.nativeEvent.layoutMeasurement.width;
    const indexByDistance = event.nativeEvent.contentOffset.x / itemSize;
    const roundIndex = Math.round(indexByDistance);
    const distance = Math.abs(roundIndex - indexByDistance);
    const isNoMansLand = distance < 0.4;
    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }

  const renderItem = ({item, cardId}) => {
    return (
      <Pressable {...otherProps} style={defaultItemStyle} key={cardId}>
        <GameCardItem
          content={item?.task}
          style={{width: itemWidth}}
          contentStyle={contentStyle}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      itemSize={itemWidth}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={defaultContainerStyle}
      // ItemSeparatorComponent={<View style={{width: centerAlign * 2}} />}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
  );
}
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
