import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MiniCardItem from './MiniCardItem';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function HorizontalCardList(props) {
  const {style, data, navigation, ...otherProps} = props;

  const handleImageAreaPress = ({cardDeckId, cardDeck}) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeck || '',
      },
    });
  };
  const handleButtonPress = ({cardDeckId, cardDeck}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeck || '',
      },
    });
  };

  function renderItem({item}) {
    const {cardDeckId, cardDeck} = item;
    return (
      <MiniCardItem
        {...otherProps}
        key={cardDeckId}
        data={item}
        onImageAreaPress={() => handleImageAreaPress({cardDeckId, cardDeck})}
        onButtonPress={() => handleButtonPress({cardDeckId, cardDeck})}
      />
    );
  }

  return (
    <>
      <FlatList
        style={[styles.container, style]}
        horizontal={true}
        listKey={true}
        ItemSeparatorComponent={<View style={styles.separator} />}
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer]}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  separator: {
    width: 32,
  },
});
