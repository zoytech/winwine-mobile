import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {convertIdToStorageKey, getItemStorage, setItemStorage} from 'src/utils';
import {KEY} from 'src/constants';
import {
  addRecentlyKeys,
  loadCardDeckByDeckId,
  selectCardDeckById,
} from 'src/redux/slices';
import processingRecentlyData from './processingRecentlyData';

function useRecentlyCardDeck(cardDeckId) {
  const dispatch = useDispatch();
  const cardDeckKey = convertIdToStorageKey(cardDeckId, KEY.CARD_DECK);
  const cardDeckFromStore = useSelector(state =>
    selectCardDeckById(cardDeckId, state),
  );

  useEffect(() => {
    if (!cardDeckFromStore || !cardDeckFromStore?.detailed) {
      dispatch(loadCardDeckByDeckId(cardDeckId));
    }
  }, [dispatch, cardDeckId]);

  useEffect(() => {
    if (cardDeckFromStore) {
      saveRecentlyCardDeckIntoStorage(cardDeckFromStore);
    }
  }, [cardDeckFromStore]);

  async function saveRecentlyCardDeckIntoStorage(newCardDeck) {
    try {
      const cardDeckKeys = await getItemStorage(
        KEY.RECENTLY_CARD_DECK_ID_KEYS,
        [],
      );
      cardDeckKeys.unshift(cardDeckKey);
      const recentlyKeys = processingRecentlyData(cardDeckKeys);
      await setItemStorage(KEY.RECENTLY_CARD_DECK_ID_KEYS, recentlyKeys);
      dispatch(addRecentlyKeys(recentlyKeys));
      // check is card deck in this pool or not
      const counterKeys = await getItemStorage(KEY.DECK_COUNT, {});
      const hasCounterKey = counterKeys.hasOwnProperty(cardDeckKey);
      console.log();
      if (!hasCounterKey) {
        counterKeys[cardDeckKey] = [KEY.RECENTLY_CARD_DECK_ID_KEYS];
      } else if (
        counterKeys[cardDeckKey].includes(KEY.RECENTLY_CARD_DECK_ID_KEYS)
      ) {
        // increase
        counterKeys[cardDeckKey].push(KEY.RECENTLY_CARD_DECK_ID_KEYS);
      }
      await setItemStorage(KEY.DECK_COUNT, counterKeys);
      await setItemStorage(cardDeckKey, newCardDeck);
    } catch (e) {
      console.error('Add card deck to storage cause error: ', e);
    }
  }

  return {cardDeck: cardDeckFromStore};
}

export default useRecentlyCardDeck;
