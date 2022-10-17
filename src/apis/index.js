import mockGetCardDeckById from './mockData/mockGetCardDeckById.json';
import mockGetPopularCardDecks from './mockData/mockGetPopularCardDecks.json';
import mockGetRecentlyCardDecks from './mockData/mockGetRecentlyCardDecks.json';
import mockSuggestedHashtag from './mockData/suggested-hashtag.json';

function promiseWithTimeout(data, timeout = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

function getCardDeckById(id) {
  //fetch(`/apis/v1/cardDecks/${cardDeckId}`);
  console.log('GET:' + `/api/v1/card-decks/${id}`);
  const cardDeckData = mockGetCardDeckById?.data;
  const cardDeckItem = cardDeckData.find(({cardDeckId}) => cardDeckId === id);
  return promiseWithTimeout(cardDeckItem);
}

function getPopularCardDecks() {
  //fetch(`/apis/v1/card-decks?hashtag_id=htg1&variant=popular&limit=50`);
  console.log(
    'GET:' + '/apis/v1/card-decks?hashtag_id=htg1&variant=popular&limit=50',
  );
  return promiseWithTimeout(mockGetPopularCardDecks);
}

function getRecentlyCardDecks() {
  //fetch(`/apis/v1/card-decks?hashtag_id=htg1&variant=rencently&limit=50`);
  console.log(
    'GET:' + '/apis/v1/card-decks?hashtag_id=htg1&variant=recently&limit=50',
  );
  return promiseWithTimeout(mockGetRecentlyCardDecks);
}

function getSuggestedHashtag() {
  //fetch(/apis/v1/tags)
  console.log('GET:' + '/apis/v1/tags');
  return promiseWithTimeout(mockSuggestedHashtag);
}

export default {
  getCardDeckById,
  getPopularCardDecks,
  getRecentlyCardDecks,
  getSuggestedHashtag,
};
