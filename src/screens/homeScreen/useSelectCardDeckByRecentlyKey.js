import {useSelector} from 'react-redux';
import {normalizedCardDecksSelect, recentlyIdsSelect} from 'src/redux/slices';

export default function useSelectCardDeckByRecentlyKey() {
  const normalCardDecks = useSelector(
    normalizedCardDecksSelect,
  )?.normalCardDecks;
  const recentlyIds = useSelector(recentlyIdsSelect) || [];
  // console.log('recentlyIds: ', recentlyIds);
  return recentlyIds.map(id => {
    if (normalCardDecks.hasOwnProperty(id)) {
      return normalCardDecks[id];
    }
  });
}

const abc = [{id: 1}, {id: 2}, {id: 3}];
const temp = [1, 3];
