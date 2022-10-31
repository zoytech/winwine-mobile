import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MiniCardItem from './miniCardItem';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function HorizontalCardList(props) {
  const {style, data, navigation, ...otherProps} = props;

  const handleImageAreaPress = (cardDeck, cardDeckId) => {
    navigation.navigate({
      name: ScreenKeys.GAME_WAIT,
      params: {
        deckId: cardDeckId || '',
        title: cardDeck || '',
      },
    });
  };
  const handleButtonPress = (cardDeck, cardDeckId) => {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: cardDeckId || '',
        title: cardDeck || '',
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
        onImageAreaPress={() => handleImageAreaPress(cardDeck, cardDeckId)}
        onButtonPress={() => handleButtonPress(cardDeck, cardDeckId)}
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
