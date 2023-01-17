import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  convertIdToStorageKey,
  convertStorageKeyToId,
  getItemStorage,
  getMultiStorage,
  normalizedBy,
} from 'src/utils';
import {KEY} from 'src/constants';
import {
  addAllRecentlyCardDeckIds,
  loadAllCardDeckSuccess,
  loadCardDeckByDeckIds,
  selectCardDecksStore,
  selectRecentlyCardDeckStore,
} from 'src/redux/slices';

const testRecentlyCardDeckIds1 = ['123', '456'];

function useRecentlyCardDecks() {
  const dispatch = useDispatch();
  const {recentlyCardDeckIds = []} = useSelector(selectRecentlyCardDeckStore);
  const {cardDecks = {}} = useSelector(selectCardDecksStore);
  const recentlyCardDecks = recentlyCardDeckIds.map(id => {
    return cardDecks[id];
  });

  const testRecentlyCardDeckIds =
    recentlyCardDeckIds && recentlyCardDeckIds.length > 0
      ? recentlyCardDeckIds.concat(testRecentlyCardDeckIds1)
      : [];

  useEffect(() => {
    if (!testRecentlyCardDeckIds || testRecentlyCardDeckIds.length === 0) {
      warmUpRecentlyCardDeckIds();
    }

    const missingCardDeckIds = testRecentlyCardDeckIds.filter(cardDeckId => {
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
    const storageCardDecks = await getMultiStorage(
      missingCardDeckIds.map(cardDeckId => convertIdToStorageKey(cardDeckId)),
    );
    dispatch(loadAllCardDeckSuccess({cardDecks: storageCardDecks}));
    const normalStorageCardDecks = storageCardDecks.reduce(
      normalizedBy('cardDeckId'),
      {},
    );

    const missingIdsFromStorageCardDecks = missingCardDeckIds.filter(
      cardDeckId => !normalStorageCardDecks[cardDeckId],
    );
    if (
      missingIdsFromStorageCardDecks &&
      missingIdsFromStorageCardDecks.length !== 0
    ) {
      dispatch(loadCardDeckByDeckIds(missingIdsFromStorageCardDecks));
      dispatch(addAllRecentlyCardDeckIds(missingIdsFromStorageCardDecks));
      //in think there is no need to save missing card decks to storage unless user enters to game play
      // of one of them where useRecentlyCardDeck is triggered to save to storage
    }
  }

  //storageCardDecks && storageCardDecks.length !== 0

  return {recentlyCardDecks};
}

export default useRecentlyCardDecks;
