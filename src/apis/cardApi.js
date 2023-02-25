import ApiInstance from './ApiInstance';

function getCardsByCardDeckId(cardDeckId) {
  return ApiInstance.getRequest(`/card-decks/${cardDeckId}/cards`);
}

function postCardByCardDeckId(cardDeckId, config) {
  return ApiInstance.postRequest(`/card-decks/${cardDeckId}/cards`, config);
}

export default {getCardsByCardDeckId, postCardByCardDeckId};
