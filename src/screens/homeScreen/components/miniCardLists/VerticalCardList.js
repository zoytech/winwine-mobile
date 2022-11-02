import React from 'react';
import {StyleSheet, View} from 'react-native';
import MiniCardItem from './miniCardItem';
import {ScreenKeys} from 'src/navigations/ScreenKeys';

export default function VerticalCardList(props) {
  const {style, data, navigation, ...otherProps} = props;

  const handleImageAreaPress = ({cardDeckId, cardDeck}) => {
    navigation.navigate({
      name: ScreenKeys.GAME_PLAY,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeck || '',
      },
    });
  };
  const handleButtonPress = ({cardDeckId, cardDeck}) => {
    navigation.navigate({
      name: ScreenKeys.GAME_WAIT,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeck || '',
      },
    });
  };

  function renderItem(item) {
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
