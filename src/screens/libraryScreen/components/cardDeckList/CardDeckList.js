import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {defaultOfDeck} from 'src/constants';
import MiniCardItem from './MiniCardItem';
import {removeJustOneItem} from 'src/utils';

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
  const [pinDeckIds, setPinDeckIds] = useState([]);
  const [isPinned, setIsPinned] = useState(false);
  const {TITLE, IMAGE} = defaultOfDeck;

  useEffect(() => {
    if (chipId === null) {
      pinDeckIds === []
        ? setSortByTagData(data)
        : setSortByTagData(getPinnedFirst(data));
    } else {
      const newData = getFilteringDataByTag(data, chipId);
      pinDeckIds === []
        ? setSortByTagData(newData)
        : setSortByTagData(getPinnedFirst(newData));
    }
  }, [chipId, pinDeckIds]);

  function getPinnedFirst(arr) {
    return arr.reduce((acc, element) => {
      const hasPinId = pinDeckIds.includes(element?.cardDeckId);
      return hasPinId ? [element, ...acc] : [...acc, element];
    }, []);
  }

  function getFilteringDataByTag(dt, tagId) {
    return dt.filter(item => item?.tag === tagId);
  }

  function handlePinningPress(id) {
    const hasPinId = pinDeckIds && pinDeckIds.includes(id);
    if (hasPinId) {
      const newData = removeJustOneItem(pinDeckIds, id);
      setPinDeckIds(newData);
      setIsPinned(false);
    } else {
      setPinDeckIds([...pinDeckIds, id]);
      setIsPinned(true);
    }
  }

  const handlePlayPress = ({
    cardDeckId,
    cardDeck: cardDeckName,
    uri: cardDeckImage,
  }) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeckName ? cardDeckName : TITLE,
        deckSource: cardDeckImage ? {uri: cardDeckImage} : IMAGE,
      },
    });
  };
  const handlePreviewPress = ({
    cardDeckId,
    cardDeck: cardDeckName,
    uri: cardDeckImage,
  }) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        deckId: cardDeckId ? cardDeckId : '',
        deckTitle: cardDeckName ? cardDeckName : TITLE,
        deckSource: cardDeckImage ? {uri: cardDeckImage} : IMAGE,
      },
    });
  };
  const handleNavigateToActionBoard = (deckId, hasPinnedId) => {
    navigation.navigate({
      name: ScreenKeys.DECK_ACTION,
      params: {
        onPinningPress: () => {
          handlePinningPress(deckId);
        },
        hasPinnedId: hasPinnedId,
      },
    });
  };

  function renderItem(item, index) {
    const itemStyle = [styles.item, getMarginItem(index)];
    const deckId = item?.cardDeckId;
    const hasPinnedId = pinDeckIds.includes(deckId);
    return (
      <MiniCardItem
        {...otherProps}
        key={deckId}
        data={item}
        pinned={hasPinnedId}
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
        onLongPress={() => handleNavigateToActionBoard(deckId, hasPinnedId)}
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
