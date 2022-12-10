import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import MiniCardItem2 from './MiniCardItem2';
import {defaultOfDeck} from 'src/constants';

export default function VerticalCardList2(props) {
  const {style, data = [], navigation, ...otherProps} = props;
  const {TITLE, IMAGE} = defaultOfDeck;

  const handleImageAreaPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeckName ? cardDeckName : TITLE,
        deckSource: cardDeckImage ? {uri: cardDeckImage} : IMAGE,
      },
    });
  };
  const handleButtonPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeckName ? cardDeckName : TITLE,
        deckSource: cardDeckImage ? {uri: cardDeckImage} : IMAGE,
      },
    });
  };

  function renderItem(item) {
    const cardDeckId = item?.cardDeckId;
    return (
      <MiniCardItem2
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
