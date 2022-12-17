import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {defaultOfDeck} from 'src/constants';
import MiniCardItem from './MiniCardItem';
import {insertAndShift} from 'src/utils';

function getMarginItem(index) {
  return index % 2 === 0
    ? {
        marginRight: 16,
      }
    : {
        marginLeft: 16,
      };
}

export default function CardDeckList(props) {
  const {
    style,
    data = [],
    prevSelectedChip,
    chipId,
    navigation,
    ...otherProps
  } = props;
  const [sortByTagData, setSortByTagData] = useState([]);
  const [pinnedIndex, setPinnedIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  console.log('first item outside: ', sortByTagData[0]?.cardDeck);
  const {TITLE, IMAGE} = defaultOfDeck;
  useEffect(() => {
    if (chipId === null) {
      if (pinnedIndex === 0) {
        setSortByTagData(data);
      } else {
        getPinnedData(data, pinnedIndex);
        setSortByTagData(data);
      }
    } else {
      const newData = data.filter(item => item?.tag === chipId);
      if (pinnedIndex === 0) {
        setSortByTagData(newData);
      } else {
        getPinnedData(newData, pinnedIndex);
        setSortByTagData(newData);
      }
    }
  }, [chipId, pinnedIndex, data]);

  function getPinnedData(dt, i) {
    insertAndShift(dt, i, 0);
  }

  function handlePinningPress(i) {
    if (i === pinnedIndex) {
      setPinnedIndex(0);
      setIsPinned(false);
    } else {
      setPinnedIndex(i);
      setIsPinned(true);
    }
  }

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
  const handleNavigateToActionBoard = (item, index) => {
    navigation.navigate({
      name: ScreenKeys.DECK_ACTION,
      params: {
        onPinningPress: () => handlePinningPress(index),
      },
    });
  };

  function renderItem(item, index) {
    const itemStyle = [styles.item, getMarginItem(index)];
    const deckId = item?.cardDeckId;
    return (
      <MiniCardItem
        {...otherProps}
        key={deckId}
        data={item}
        pinned={isPinned}
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
        onLongPress={() => handleNavigateToActionBoard(item, index)}
        style={itemStyle}
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      {sortByTagData &&
        sortByTagData.map((item, index) => renderItem(item, index))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },

  item: {
    marginBottom: 32,
  },
  layout: {
    flexDirection: 'column',
  },
  testButton: {
    backgroundColor: 'coral',
    width: 50,
    height: 50,
  },
});
