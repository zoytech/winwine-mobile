import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenKeys} from 'src/navigations/ScreenKeys';
import {DECK, KEY} from 'src/constants';
import {removeJustOneItem} from 'src/utils';
import {MiniCardItem} from 'src/screens/components';
import {getFilteringDataByTag, getMarginItem, getPinnedFirst} from './methods';
import {addLibraryKeyStore, removeLibraryKeyStore} from 'src/redux/actions';
import {libraryKeyStoreSelector} from 'src/redux/selectors';

export default function LibraryCardDecks(props) {
  const {style, data, selectedChip, navigation, ...otherProps} = props;
  const dispatch = useDispatch();
  const libraryKeyStores = useSelector(libraryKeyStoreSelector);
  const [sortByTagData, setSortByTagData] = useState([]);
  const [pinDeckIds, setPinDeckIds] = useState([]);
  const [likedDeckIds, setLikeDeckIds] = useState([]);
  const [saveStatus, setSaveStatus] = useState(false);

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

  async function removeItemFromStorage(key) {
    const keyStore = `${KEY?.SAVE_LIB}/${key}`;
    try {
      await AsyncStorage.removeItem(keyStore);
      dispatch(removeLibraryKeyStore(keyStore));
    } catch (e) {
      console.log('fail remove in save lib: ', e);
    }
  }

  async function saveItemToStorage(key, dt) {
    const keyStore = `${KEY?.SAVE_LIB}/${key}`;
    try {
      const jsonValue = JSON.stringify(dt);
      await AsyncStorage.setItem(keyStore, jsonValue);
      dispatch(addLibraryKeyStore(keyStore));
    } catch (e) {
      console.log('fail store in save lib: ', e);
    }
  }

  async function handleSavePress(id) {
    const keyStore = `${KEY?.SAVE_LIB}/${id}`;
    const hasSaveId = libraryKeyStores.includes(keyStore);
    if (hasSaveId) {
      await removeItemFromStorage(id);
    } else {
      await saveItemToStorage(id, sortByTagData);
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
  const handleNavigateToActionBoard = (
    cardDeckId,
    hasPinnedId,
    hasLikedId,
    hasSaveId,
  ) => {
    navigation.navigate({
      name: ScreenKeys.ACTION_LIB,
      params: {
        onPinningPress: () => handlePinningPress(cardDeckId),
        hasPinnedId: hasPinnedId,
        onLikePress: () => handleLikePress(cardDeckId),
        hasLikedId: hasLikedId,
        onSavePress: () => handleSavePress(cardDeckId),
        hasSaveId: hasSaveId,
      },
    });
  };

  function renderItem(item, index) {
    const itemStyle = [styles.item, getMarginItem(index)];
    const deckId = item?.cardDeckId;
    const hasPinnedId = pinDeckIds.includes(deckId);
    const hasLikedId = likedDeckIds.includes(deckId);
    const hasSaveId = libraryKeyStores.includes(`${KEY?.SAVE_LIB}/${deckId}`);

    return (
      <MiniCardItem
        {...otherProps}
        key={deckId}
        data={item}
        pinned={hasPinnedId}
        liked={hasLikedId}
        saved={hasSaveId}
        onPreviewPress={() => handlePreviewPress(item)}
        onPlayPress={() => handlePlayPress(item)}
        onLongPress={() =>
          handleNavigateToActionBoard(
            deckId,
            hasPinnedId,
            hasLikedId,
            hasSaveId,
          )
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
