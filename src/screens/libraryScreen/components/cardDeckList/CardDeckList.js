import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {defaultOfDeck} from 'src/constants';
import MiniCardItem from './MiniCardItem';
import {normalizedBy, removeJustOneItem} from 'src/utils';

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
  const [pinId, setPinId] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const {TITLE, IMAGE} = defaultOfDeck;
  /////////////////////////////////
  // pinDeckIds: co dinh ---- allDeckIds: thay doi theo tag
  const normalizedSortedData = sortByTagData
    .map(item => ({...item}))
    .reduce(normalizedBy('cardDeckId'), {});
  console.log(
    'sortByTagData: ',
    sortByTagData.map(item => item?.cardDeck),
  );
  useEffect(() => {
    if (chipId === null) {
      if (pinDeckIds === []) {
        setSortByTagData(data);
      } else {
        const pinnedData = getPinnedData(data);
        setSortByTagData(pinnedData);
      }
    } else {
      const newData = getFilteringDataByTag(data, chipId);
      if (pinDeckIds === []) {
        setSortByTagData(newData);
      } else {
        const pinnedData = getPinnedData(newData);
        setSortByTagData(pinnedData);
      }
    }
  }, [chipId, pinDeckIds]);

  function getPinnedData(arr) {
    return arr.reduce((acc, element) => {
      if (pinDeckIds.includes(element?.cardDeckId)) {
        return [element, ...acc];
      }
      return [...acc, element];
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

  //pin trước -> pinindex = 3, sau đó khi thay đổi tagName -> data thay đổi -> update pinIndex luôn

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
  const handleNavigateToActionBoard = (item, index) => {
    const deckId = item?.cardDeckId;
    navigation.navigate({
      name: ScreenKeys.DECK_ACTION,
      params: {
        onPinningPress: () => {
          handlePinningPress(deckId);
        },
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

/*
NORMALIZATION DATA

 const normalizedCardDeck = sortByTagData
    .map(item => item)
    .reduce(normalizedBy('cardDeckId'), {});
  const cardDeckList = {byId: normalizedCardDeck, allIds: allDeckIds};
 */
