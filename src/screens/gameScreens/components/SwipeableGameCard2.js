import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import {Carousel, FilledCard} from 'src/components';
import {useRef} from 'react';
import {Typography} from '../../../themes';

const {width: windowWidth} = Dimensions.get('window');

export default function SwipeableGameCard(props) {
  const {data, taskTurn, style, contentStyle, ...otherProps} = props;

  const carouselRef = useRef(null);
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        {...otherProps}
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <FilledCard {...otherProps} style={styles.gameCard}>
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
      style={styles.carousel}
      itemWidth={windowWidth * 0.8}
      containerWidth={windowWidth}
      separatorWidth={0}
    />
  );
}
const styles = StyleSheet.create({
  gameCard: {
    width: '80%',
    height: '100%',
    borderWidth: 0.5,
    backgroundColor: 'yellow',
  },
  container: {
    width: '100%',
    aspectRatio: 0.85,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  carousel: {
    flexGrow: 0,
    height: 150,
    backgroundColor: 'coral',
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
