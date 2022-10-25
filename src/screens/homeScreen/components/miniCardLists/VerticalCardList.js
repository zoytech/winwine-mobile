import React from 'react';
import {StyleSheet, View} from 'react-native';
import MiniCardItem from './miniCardItem';
import {ScreenKeys} from '../../../../navigations/ScreenKeys';

export default function VerticalCardList(props) {
  const {style, data, navigation, ...otherProps} = props;

  const handleImageAreaPress = (cardDeck, cardDeckId) => {
    navigation.navigate({
      name: ScreenKeys.GAME_WAIT,
      params: {
        deckId: cardDeckId || '',
        title: cardDeck || ScreenKeys.GAME_WAIT,
      },
    });
  };
  const handleButtonPress = (cardDeck, cardDeckId) => {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: cardDeckId || '',
        title: cardDeck || ScreenKeys.GAME_PLAY,
      },
    });
  };

  function renderItem(item) {
    const {cardDeck, cardDeckId} = item;
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
    <View style={[styles.container, style]}>
      {data && data.map(item => renderItem(item))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  separator: {
    height: 32,
  },
});
