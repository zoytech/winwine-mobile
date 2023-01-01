import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {DECK} from 'src/constants';
import {removeJustOneItem} from 'src/utils';
import {MiniCardItem} from 'src/screens/components';
import {getFilteringDataByTag, getMarginItem, getPinnedFirst} from './methods';

export default function LibraryCardDecks(props) {
  const {style, data, selectedChip, navigation, ...otherProps} = props;
  const [sortByTagData, setSortByTagData] = useState([]);
  const [pinDeckIds, setPinDeckIds] = useState([]);
  const [likedDeckIds, setLikeDeckIds] = useState([]);
  useEffect(() => {
    getDataByTagAndPin(data, selectedChip, pinDeckIds);
  }, [selectedChip, pinDeckIds, data]);

  function getDataByTagAndPin(dt, tagId, pinIds) {
    if (tagId === null) {
      pinIds === []
        ? setSortByTagData(dt)
        : setSortByTagData(getPinnedFirst(dt, pinDeckIds));
    } else {
      const newData = getFilteringDataByTag(dt, tagId);
      pinIds === []
        ? setSortByTagData(newData)
        : setSortByTagData(getPinnedFirst(newData, pinDeckIds));
    }
  }

  function handlePinningPress(id) {
    const hasPinId = pinDeckIds && pinDeckIds.includes(id);
    if (hasPinId) {
      const newData = removeJustOneItem(pinDeckIds, id);
      setPinDeckIds(newData);
    } else {
      setPinDeckIds([...pinDeckIds, id]);
    }
  }

  function handleLikePress(id) {
    const hasLikeId = likedDeckIds && likedDeckIds.includes(id);
    if (hasLikeId) {
      const newData = removeJustOneItem(likedDeckIds, id);
      setLikeDeckIds(newData);
    } else {
      setLikeDeckIds([...likedDeckIds, id]);
    }
  }

  const handlePlayPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.PLAY_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImage: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
      },
    });
  };
  const handlePreviewPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImage: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
      },
    });
  };
  const handleNavigateToActionBoard = (cardDeckId, hasPinnedId, hasLikedId) => {
    navigation.navigate({
      name: ScreenKeys.ACTION_LIB,
      params: {
        onPinningPress: () => handlePinningPress(cardDeckId),
        hasPinnedId: hasPinnedId,
        onLikePress: () => handleLikePress(cardDeckId),
        hasLikedId: hasLikedId,
      },
    });
  };

  function renderItem(item, index) {
    const itemStyle = [styles.item, getMarginItem(index)];
    const deckId = item?.cardDeckId;
    const hasPinnedId = pinDeckIds.includes(deckId);
    const hasLikedId = likedDeckIds.includes(deckId);
    return (
      <MiniCardItem
        {...otherProps}
        key={deckId}
        data={item}
        pinned={hasPinnedId}
        liked={hasLikedId}
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
        onLongPress={() =>
          handleNavigateToActionBoard(deckId, hasPinnedId, hasLikedId)
        }
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
