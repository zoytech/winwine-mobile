import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import MiniCardItem2 from './MiniCardItem2';

export default function VerticalCardList2(props) {
  const {style, data = [], navigation, ...otherProps} = props;

  const handleImageAreaPress = ({cardDeckId, cardDeckName}) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeckName || '',
      },
    });
  };
  const handleButtonPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId || '',
        deckTitle: cardDeckName || '',
        deckSource: cardDeckImage || '',
      },
    });
  };

  function renderItem(item) {
    const {cardDeckId, cardDeckName, cardDeckImage} = item || {};
    return (
      <MiniCardItem2
        {...otherProps}
        key={cardDeckId}
        data={item}
        onImageAreaPress={() =>
          handleImageAreaPress({cardDeckId, cardDeckName})
        }
        onButtonPress={() =>
          handleButtonPress({cardDeckId, cardDeckName, cardDeckImage})
        }
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
