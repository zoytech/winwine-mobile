import {
  FETCH_DECK_AND_CARDS_ERROR,
  FETCH_DECK_AND_CARDS_REQUEST,
  FETCH_DECK_AND_CARDS_SUCCESS,
} from 'src/redux/constants';
import {api} from 'src/constants';

export default function loadCardDeckAndCardsByDeckId(cardDeckId) {
  return dispatch => {
    dispatch(fetchDbRequesting());

    const urls = [
      `${api?.HOST}/${api?.PATH}/card-decks/${cardDeckId}`,
      `${api?.HOST}/${api?.PATH}/card-decks/${cardDeckId}/cards`,
    ];

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const fetchJson = url => fetch(url, options).then(res => res.json());

    Promise.all(urls.map(fetchJson))
      .then(([cardDeckData, cardsData]) => {
        const cardDeck = cardDeckData?.data;
        const cards = cardsData?.data;
        dispatch(fetchDbSuccess({cardDeck, cards}));
      })
      .catch(err => {
        dispatch(fetchDbError(err));
      });
  };
}

export const fetchDbRequesting = () => ({
  type: FETCH_DECK_AND_CARDS_REQUEST,
});

export const fetchDbSuccess = ({cardDeck, cards}) => ({
  type: FETCH_DECK_AND_CARDS_SUCCESS,
  payload: {cardDeck, cards},
});

export const fetchDbError = err => ({
  type: FETCH_DECK_AND_CARDS_ERROR,
  payload: {err},
});
