import {GET_CARD_DECK} from '../constants';
import API from '../../apis';

export function setCardDeck(cardDeckItem) {
  return {
    type: GET_CARD_DECK,
    payload: cardDeckItem,
  };
}

export function getCardDeck(cardDeckId) {
  return async dispatch => {
    try {
      const cardDeck = await API.getCardDeckById(cardDeckId);
      console.log(cardDeck);
      await dispatch(setCardDeck(cardDeck));
      return cardDeck || {};
    } catch (error) {
      console.error(error);
    }
  };
}
