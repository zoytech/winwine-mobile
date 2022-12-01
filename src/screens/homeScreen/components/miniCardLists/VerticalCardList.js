import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import MiniCardItem from './MiniCardItem';

export default function VerticalCardList(props) {
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
  const handleButtonPress = ({cardDeckId, cardDeck, uri}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeck || '',
        deckSource: uri || '',
      },
    });
  };

  function renderItem(item) {
    const {cardDeckId, cardDeck, uri} = item;
    return (
      <MiniCardItem
        {...otherProps}
        key={cardDeckId}
        data={item}
        onImageAreaPress={() => handleImageAreaPress({cardDeckId, cardDeck})}
        onButtonPress={() => handleButtonPress({cardDeckId, cardDeck, uri})}
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
