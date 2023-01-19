import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  convertIdToStorageKey,
  convertStorageKeyToId,
  getItemStorage,
  setItemStorage,
} from 'src/utils';
import {KEY} from 'src/constants';
import {
  addAllRecentlyCardDeckIds,
  loadCardDeckByDeckId,
  selectCardDeckById,
} from 'src/redux/slices';
import processingRecentlyData from './processingRecentlyData';

function useRecentlyCardDeckById(cardDeckId) {
  const dispatch = useDispatch();
  const cardDeckKey = convertIdToStorageKey(cardDeckId, KEY.CARD_DECK);
  const cardDeckFromStore = useSelector(state =>
    selectCardDeckById(state, cardDeckId),
  );

  useEffect(() => {
    if (!cardDeckFromStore || !cardDeckFromStore?.detailed) {
      dispatch(loadCardDeckByDeckId(cardDeckId));
    }
  }, [dispatch, cardDeckId]);

  useEffect(() => {
    if (cardDeckFromStore?.detailed) {
      saveRecentlyCardDeckIntoStorage(cardDeckFromStore);
    }
  }, [cardDeckFromStore?.detailed]);

  async function saveRecentlyCardDeckIntoStorage(newCardDeck) {
    try {
      const cardDeckKeys = await getItemStorage(
        KEY.RECENTLY_CARD_DECK_ID_KEYS,
        [],
      );
      cardDeckKeys.unshift(cardDeckKey);
      const recentlyKeys = processingRecentlyData(cardDeckKeys);
      await setItemStorage(KEY.RECENTLY_CARD_DECK_ID_KEYS, recentlyKeys);
      dispatch(addAllRecentlyCardDeckIds([newCardDeck?.cardDeckId]));

      const counterKeys = await getItemStorage(KEY.DECK_COUNT, {});
      if (!counterKeys[cardDeckKey]) {
        counterKeys[cardDeckKey] = [KEY.RECENTLY_CARD_DECK_ID_KEYS];
      } else if (
        counterKeys[cardDeckKey].includes(KEY.RECENTLY_CARD_DECK_ID_KEYS)
      ) {
        // increase
        counterKeys[cardDeckKey].push(KEY.RECENTLY_CARD_DECK_ID_KEYS);
      }
      await setItemStorage(KEY.DECK_COUNT, counterKeys);
      await setItemStorage(cardDeckKey, newCardDeck);

      await getItemStorage(KEY.RECENTLY_CARD_DECK_ID_KEYS, []);
    } catch (e) {
      console.error('Add card deck to storage cause error: ', e);
    }
  }

  return {cardDeck: cardDeckFromStore};
}

export default useRecentlyCardDeckById;
