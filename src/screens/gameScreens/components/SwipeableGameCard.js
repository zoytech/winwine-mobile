import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useRef} from 'react';

const screenWidth = Dimensions.get('screen').width;
const SPACING = 5;
const ITEM_WIDTH = screenWidth * 0.8; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;
export default function SwipeableGameCard(props) {
  const {
    data,
    renderItem,
    taskTurn,
    style,
    contentStyle,
    itemStyle,
    cardStyle,
    separatorWidth,
    ...otherProps
  } = props;

  const carouselRef = useRef(null);
  // return <View />;
  return <Carousel ref={carouselRef} data={data} renderItem={renderItem} />;
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

/*

 <View>
        <FlatList
          data={data}
          horizontal={true}
          listKey={true}
          renderItem={renderGameCardItem}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
*/

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
