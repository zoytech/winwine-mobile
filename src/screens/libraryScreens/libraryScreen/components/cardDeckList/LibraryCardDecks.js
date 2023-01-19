import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {DECK, KEY, LIMIT} from 'src/constants';
import {
  hasStoreKeyInStorage,
  remove,
  removeItemFromStorage,
  removeKeyStoresFromStorage,
  saveItemToStorage,
  saveKeyStoresToStorage,
} from 'src/utils';
import {MiniCardItem} from 'src/screens/components';
import {getFilteringDataByTag, getMarginItem, getPinnedFirst} from './methods';
import {
  addLibraryKeyStore,
  libraryKeyStoreSelect,
  removeLibraryKeyStore,
} from 'src/redux/slices';

export default function LibraryCardDecks(props) {
  const {style, data, selectedChip, navigation, enabled, ...otherProps} = props;
  const dispatch = useDispatch();
  const keyStores = useSelector(libraryKeyStoreSelect);
  const [sortByTagData, setSortByTagData] = useState([]);
  const [pinDeckIds, setPinDeckIds] = useState([]);
  const [likedDeckIds, setLikeDeckIds] = useState([]);
  //
  // useEffect(() => {
  //   setPinDeckIds(Async.getpinIds());
  // }, []);

  useEffect(() => {
    getDataByTagAndPin(data, selectedChip, pinDeckIds);
  }, [selectedChip, pinDeckIds, data]);

  function getDataByTagAndPin(dt, tagId, pinIds) {
    if (tagId === null) {
      //pinIds === undefined?
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

  async function handleToggleSavePress(id) {
    const keyStore = `${KEY?.SAVE_LIB}/${id}`;
    try {
      const hasSaveIdRqs = await hasStoreKeyInStorage(
        id,
        KEY?.SAVE_LIB,
        keyStores,
      );
      /// key in lib storage
      // 2 storage : in lib key and mutual keys
      // just only save @ in mutual keys
      if (hasSaveIdRqs) {
        await removeItemFromStorage(id, KEY.SAVE_LIB);
        dispatch(removeLibraryKeyStore(keyStore));
        /////// not here
        await removeKeyStoresFromStorage(id, KEY.SAVE_LIB);
      } else {
        await saveItemToStorage(id, KEY.SAVE_LIB, sortByTagData);
        dispatch(addLibraryKeyStore(keyStore));
        await saveKeyStoresToStorage(id, KEY.SAVE_LIB, LIMIT.LIB_CARD_DECKS);
      }
    } catch (e) {
      console.log('handleSavePress error: ', e);
    }
  }

  async function handlePinningPress(id) {
    try {
      const hasPinIdRqs = await hasStoreKeyInStorage(
        id,
        KEY?.SAVE_PIN_DECK,
        pinDeckIds,
      );
      if (hasPinIdRqs) {
        const newData = remove.elementAtMiddle(pinDeckIds, id);
        setPinDeckIds(newData);
        await removeKeyStoresFromStorage(id, KEY.SAVE_PIN_DECK);
      } else {
        setPinDeckIds([...pinDeckIds, id]);
        await saveKeyStoresToStorage(id, KEY.SAVE_PIN_DECK);
      }
    } catch (e) {
      console.log('handlePinningPress error: ', e);
    }
  }

  function handleLikePress(id) {
    const hasLikeId = likedDeckIds && likedDeckIds.includes(id);
    if (hasLikeId) {
      const newData = remove.elementAtMiddle(likedDeckIds, id);
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
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
      },
    });
  };
  const handlePreviewPress = ({cardDeckId, cardDeckName, cardDeckImage}) => {
    navigation.navigate({
      name: ScreenKeys.WAIT_GAME,
      params: {
        cardDeckIdParam: cardDeckId ? cardDeckId : '',
        cardDeckNameParam: cardDeckName ? cardDeckName : DECK?.NAME,
        cardDeckImageParam: cardDeckImage ? {uri: cardDeckImage} : DECK?.IMAGE,
      },
    });
  };
  const handleNavigateToActionBoard = (cardDeckId, hasPinnedId, hasLikedId) => {
    // console.log('hasLikedId: ', hasLikedId);
    console.log('_______________________-');

    navigation.navigate({
      name: ScreenKeys.ACTION_LIB,
      params: {
        onPinningPress: () => handlePinningPress(cardDeckId),
        hasPinnedId: hasPinnedId,
        onLikePress: () => handleLikePress(cardDeckId),
        hasLikedId: hasLikedId,
        onSavePress: () => handleToggleSavePress(cardDeckId),
      },
    });
  };

  function renderItem(item, index) {
    const itemStyle = [styles.item, getMarginItem(index)];
    const deckId = item?.cardDeckId;
    const hasPinnedId = pinDeckIds.includes(deckId);
    const hasLikedId = likedDeckIds.includes(deckId);
    console.log('hasLikedId: ', hasLikedId);
    console.log('likedDeckIds: ', likedDeckIds);
    console.log('___________');
    return (
      <MiniCardItem
        {...otherProps}
        key={deckId}
        data={item}
        pinned={hasPinnedId}
        pinnedIds={pinDeckIds}
        liked={hasLikedId}
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
        onLongPress={() =>
          handleNavigateToActionBoard(deckId, hasPinnedId, hasLikedId)
        }
        style={itemStyle}
        enabled={enabled}
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
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 0,
  },

  item: {
    marginBottom: 16,
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
