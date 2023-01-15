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
  addRecentlyKeys,
  loadCardDeckByDeckId,
  selectCardDeckById,
  selectCardDecksStore,
  selectRecentlyCardDeckArray,
  selectRecentlyCardDeckStore,
} from 'src/redux/slices';
import processingRecentlyData from './processingRecentlyData';

function useRecentlyCardDecks() {
  const dispatch = useDispatch();
  const {recentlyCardDeckIds = []} = useSelector(selectRecentlyCardDeckStore);
  const {cardDecks = {}} = useSelector(selectCardDecksStore);
  const result = recentlyCardDeckIds.map(id => {
    cardDecks[id];
  });

  useEffect(() => {
    if (!recentlyCardDeckIds || recentlyCardDeckIds.length === 0) {
      loadRecentlyCardDecks();
    }
    loadRecentlyCardDecks(cardDecks);
  }, [dispatch, recentlyCardDeckIds, cardDecks]);

  async function loadRecentlyCardDecks(cardDecks) {
    const recentlyCardDeckKeys = await getItemStorage(
      KEY.RECENTLY_CARD_DECK_ID_KEYS,
      [],
    );

    const recentlyCardDeckIds = recentlyCardDeckKeys.map(cardDeckStorageKey => {
      return convertStorageKeyToId(cardDeckStorageKey, KEY.CARD_DECK);
    });
    dispatch(addAllRecentlyCardDeckIds(recentlyCardDeckIds));
  }

  return {recentlyCardDecks: result};
}

export default useRecentlyCardDecks;
