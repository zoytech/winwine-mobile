import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  convertIdToStorageKey,
  convertStorageKeyToId,
  getDataFromStorage,
  getItemStorage,
} from 'src/utils';
import {KEY} from 'src/constants';
import {
  addAllRecentlyCardDeckIds,
  loadAllCardDeckSuccess,
  selectCardDecksStore,
  selectRecentlyCardDeckStore,
} from 'src/redux/slices';

function useRecentlyCardDecks() {
  const dispatch = useDispatch();
  const {recentlyCardDeckIds = []} = useSelector(selectRecentlyCardDeckStore);
  const {cardDecks = {}} = useSelector(selectCardDecksStore);

  const recentlyCardDecks = recentlyCardDeckIds.map(id => {
    return cardDecks[id];
  });

  useEffect(() => {
    if (!recentlyCardDeckIds || recentlyCardDeckIds.length === 0) {
      warmUpRecentlyCardDeckIds();
    }

    const missingCardDeckIds = recentlyCardDeckIds.filter(cardDeckId => {
      return !cardDecks[cardDeckId];
    });
    if (missingCardDeckIds && missingCardDeckIds.length > 0) {
      warmUpMissingRecentlyCardDecks(missingCardDeckIds);
    }
  }, [recentlyCardDeckIds]);

  async function warmUpRecentlyCardDeckIds() {
    const recentlyCardDeckKeys = await getItemStorage(
      KEY.RECENTLY_CARD_DECK_ID_KEYS,
      [],
    );
    const storageRecentlyCardDeckIds = recentlyCardDeckKeys.map(
      cardDeckStorageKey => {
        return convertStorageKeyToId(cardDeckStorageKey, KEY.CARD_DECK);
      },
    );
    if (storageRecentlyCardDeckIds && storageRecentlyCardDeckIds.length > 0) {
      dispatch(addAllRecentlyCardDeckIds(storageRecentlyCardDeckIds));
    }
  }

  async function warmUpMissingRecentlyCardDecks(missingCardDeckIds = []) {
    const storedCardDecks = await getDataFromStorage(
      missingCardDeckIds.map(cardDeckId => convertIdToStorageKey(cardDeckId)),
    );
    dispatch(loadAllCardDeckSuccess({cardDecks: storedCardDecks}));

    //TODO: namnt handle this flow (call API to get missing card decks)
    //const missingFromStorageCardDecks = storedCardDecks.filter
  }

  return {recentlyCardDecks};
}

export default useRecentlyCardDecks;
