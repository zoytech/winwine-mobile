import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {defaultOfDeck} from 'src/constants';
import MiniCardItem from './MiniCardItem';

export default function CardDeckList(props) {
  const {
    style,
    data = [],
    prevSelectedChip,
    chipId,
    navigation,
    ...otherProps
  } = props;
  const [sortByTagData, setSorByTagData] = useState(data);
  const [selected, setSelected] = useState(false);

  const {TITLE, IMAGE} = defaultOfDeck;
  useEffect(() => {
    if (chipId === null) {
      setSorByTagData(data);
    } else {
      const newData = data.filter(item => item?.tag === chipId);
      setSorByTagData(newData);
    }
  }, [chipId]);

  const handlePlayPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeckName ? cardDeckName : TITLE,
        deckSource: cardDeckImage ? {uri: cardDeckImage} : IMAGE,
      },
    });
  };
  const handlePreviewPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeckName ? cardDeckName : TITLE,
        deckSource: cardDeckImage ? {uri: cardDeckImage} : IMAGE,
      },
    });
  };
  const handleNavigateToActionBoard = () => {
    navigation.navigate({
      name: ScreenKeys.DECK_ACTION,
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
        onLongPress={handleNavigateToActionBoard}
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      {sortByTagData && sortByTagData.map(item => renderItem(item))}
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
