import {useDispatch, useSelector} from 'react-redux';
import {convertIdToStorageKey, getItemStorage, setItemStorage} from 'src/utils';
import {KEY} from 'src/constants';
import {
  addRecentlyKeys,
  cardDeckSelect,
  loadCardDeckByDeckId,
  normalizedCardDecksSelect,
} from 'src/redux/slices';
import processingRecentlyData from './processingRecentlyData';
import {useEffect, useState} from 'react';

function useRecentlyStorage(cardDeckId, initValue) {
  const dispatch = useDispatch();
  const cardDeckKey = convertIdToStorageKey(cardDeckId, KEY.CARD_DECKS);
  const fetchedCardDeck = useSelector(cardDeckSelect);

  const normalCardDecks = useSelector(normalizedCardDecksSelect);
  const isInStoreCardDecks = normalCardDecks.hasOwnProperty(cardDeckId);

  const cardDeckItem =
    isInStoreCardDecks === true ? normalCardDecks[cardDeckId] : fetchedCardDeck;

  useEffect(() => {
    if (isInStoreCardDecks === false) {
      dispatch(loadCardDeckByDeckId(cardDeckId));
    }
  }, [dispatch, cardDeckId]);

  async function setNewCardDeck() {
    try {
      const cardDeckKeys = await getItemStorage(KEY.RECENTLY_PLAY, []);
      console.log('... then come to here: ');
      cardDeckKeys.unshift(cardDeckKey);
      const recentlyKeys = processingRecentlyData(cardDeckKeys);
      await setItemStorage(KEY.RECENTLY_PLAY, recentlyKeys);
      dispatch(addRecentlyKeys(recentlyKeys));
      // check is card deck in this pool or not
      const counterKeys = await getItemStorage(KEY.DECK_COUNT, {});
      const hasCounterKey = counterKeys.hasOwnProperty(cardDeckKey);
      console.log();
      if (!hasCounterKey) {
        counterKeys[cardDeckKey] = [KEY.RECENTLY_PLAY];
      } else if (counterKeys[cardDeckKey].includes(KEY.RECENTLY_PLAY)) {
        // increase
        counterKeys[cardDeckKey].push(KEY.RECENTLY_PLAY);
      }
      await setItemStorage(KEY.DECK_COUNT, counterKeys);
      await setItemStorage(cardDeckKey, cardDeckItem);
    } catch (e) {
      console.log('Add card deck to storage cause error: ', e);
    }
  }

  return [setNewCardDeck];
}

export default useRecentlyStorage;

/*
async function getCardDeckFromStorage() {
  try {
    const cardDeckKeys = await getItemStorage(cardDeckKey, []);
    cardDeckKeys.unshift(cardDeckKey);
    const recentlyKeys = processingRecentlyData(cardDeckKeys);
    const rawDataRqs = await AsyncStorage.multiGet(recentlyKeys);
    const retrievedData = [];
    rawDataRqs.forEach(item => {
      const [, value] = item || {};
      value && retrievedData.push(JSON.parse(value));
    });
    setRecentlyCardDecks(retrievedData);
  } catch (e) {
    console.log('getCardDeckFromStorage cause error: ', e);
  }
}

getCardDeckFromStorage();
 */
