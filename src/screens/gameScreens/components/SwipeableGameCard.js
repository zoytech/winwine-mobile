import {Dimensions, FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import {FilledCard} from 'src/components';
import {Typography} from 'src/themes';

const screenWidth = Dimensions.get('screen').width;

export default function SwipeableGameCard(props) {
  const {data, taskTurn, style, contentStyle, ...otherProps} = props;

  function renderGameCardItem({item}) {
    const {task, cardId} = item;
    return (
      <FilledCard {...otherProps} style={styles.gameCard} key={cardId}>
        <Text style={[Typography.body.large, contentStyle]}>{task}</Text>
      </FilledCard>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderGameCardItem}
      horizontal={true}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      decelerationRate={'fast'}
      disableIntervalMomentum={false}
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
