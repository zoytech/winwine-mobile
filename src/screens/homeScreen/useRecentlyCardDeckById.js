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

function useRecentlyCardDeckById(cardDeckId) {
  const dispatch = useDispatch();
  const cardDeckKey = convertIdToStorageKey(cardDeckId, KEY.CARD_DECK);
  const cardDeckFromStore = useSelector(state =>
    selectCardDeckById(state, cardDeckId),
  );
  console.log('detailed', cardDeckFromStore?.detailed);

  useEffect(() => {
    if (!cardDeckFromStore || !cardDeckFromStore?.detailed) {
      dispatch(loadCardDeckByDeckId(cardDeckId));
    }
  }, [dispatch, cardDeckId]);

  useEffect(() => {
    console.log('change', cardDeckFromStore?.detailed);
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

      const resp = await setItemStorage(
        KEY.RECENTLY_CARD_DECK_ID_KEYS,
        recentlyKeys,
      );
      console.log('resp:', resp);
      dispatch(addRecentlyKeys(recentlyKeys));

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

      const recentlyCardDeckKeys = await getItemStorage(
        KEY.RECENTLY_CARD_DECK_ID_KEYS,
        [],
      );
      console.log('recentlyCardDeckKeys', recentlyCardDeckKeys);
    } catch (e) {
      console.error('Add card deck to storage cause error: ', e);
    }
  }

  return {cardDeck: cardDeckFromStore};
}

export default useRecentlyCardDeckById;
