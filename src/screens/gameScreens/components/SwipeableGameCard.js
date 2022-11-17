import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilledCard} from 'src/components';
import {useRef} from 'react';

const screenWidth = Dimensions.get('screen').width;
const SPACING = 5;
const ITEM_WIDTH = screenWidth * 0.8; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;
const CURRENT_ITEM_TRANSLATE_Y = 48;
export default function SwipeableGameCard(props) {
  const {
    data,
    taskTurn,
    style,
    contentStyle,
    itemStyle,
    cardStyle,
    separatorWidth,
    ...otherProps
  } = props;

  const separatorStyle = [styles.separator, separatorWidth];
  const defaultItemStyle = [styles.gameCard, itemStyle];
  const defaultCardStyle = [styles.gameCard, cardStyle];

  function renderGameCardItem(data) {
    return (
      <FilledCard {...otherProps} style={defaultCardStyle}>
        <Text style={[styles.text, contentStyle]}>{data?.task}</Text>
      </FilledCard>
    );
  }

  function renderSwipealbeView({item, index}) {
    return (
      <Pressable>
        <Animated.View style={[defaultItemStyle]}>
          {renderGameCardItem(item)}
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderSwipealbeView}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item?.cardId}
      ItemSeparatorComponent={<View style={separatorStyle} />}
      decelerationRate={0}
      renderToHardwareTextureAndroid
      snapToInterval={ITEM_WIDTH}
      snapToAlignment="start"
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
