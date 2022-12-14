import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {MiniCardItem} from 'src/screens/components';
import {defaultOfDeck} from 'src/constants';

export default function VerticalCardList(props) {
  const {style, data, navigation, ...otherProps} = props;
  const {TITLE, IMAGE} = defaultOfDeck;

  const handleImageAreaPress = item => {
    const {cardDeckId, cardDeck, uri} = item || {};
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeck ? cardDeck : TITLE,
        deckSource: uri ? {uri: uri} : IMAGE,
      },
    });
  };
  const handleButtonPress = item => {
    const {cardDeckId, cardDeck, uri} = item || {};
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeck ? cardDeck : TITLE,
        deckSource: uri ? {uri: uri} : IMAGE,
      },
    });
  };

  function renderItem(item) {
    const cardDeckId = item?.cardDeckId;
    return (
      <MiniCardItem
        {...otherProps}
        key={cardDeckId}
        data={item}
        onImageAreaPress={() => handleImageAreaPress(item)}
        onButtonPress={() => handleButtonPress(item)}
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
