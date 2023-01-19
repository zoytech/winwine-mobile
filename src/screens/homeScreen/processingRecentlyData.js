import {replace, select} from 'src/utils';
import {LIMIT} from 'src/constants';

export default function processingRecentlyData(array) {
  const uniqueCardDecksKeys = select.uniqueElement(array);
  replace.lastElementWhenExceedLength(
    uniqueCardDecksKeys,
    LIMIT.RECENTLY_CARD_DECKS,
  );
  return uniqueCardDecksKeys;
}
