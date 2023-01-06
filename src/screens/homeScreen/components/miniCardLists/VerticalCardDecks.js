import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {DECK} from 'src/constants';
import {MiniCardItem} from 'src/screens/components';

export default function VerticalCardDecks(props) {
  const {style, data, navigation, ...otherProps} = props;
  const handlePlayPress = item => {
    const {cardDeckId, cardDeckName, cardDeckImage} = item || {};
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
      },
    });
  };
  const handlePreviewPress = item => {
    const {cardDeckId, cardDeckName, cardDeckImage} = item || {};
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
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
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
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
