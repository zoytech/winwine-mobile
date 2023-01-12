import {useSelector} from 'react-redux';
import {cardDecksSelect, recentlyKeyStoresSelect} from 'src/redux/slices';

export default function recentlyCardDecksSelect() {
  const cardDecks = useSelector(cardDecksSelect);
  const recentlyKeyStores = useSelector(recentlyKeyStoresSelect);
  return cardDecks.filter(item => recentlyKeyStores.includes(item?.cardDeckId));
}
