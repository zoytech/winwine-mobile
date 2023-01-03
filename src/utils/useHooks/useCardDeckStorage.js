import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {api, KEY} from '../../constants';
import {
  libraryKeyStoreSelector,
  recentlyKeyStoresSelector,
} from '../../redux/selectors';
import {addLibraryKeyStore, removeLibraryKeyStore} from '../../redux/actions';
import {addRecentlyKeyStore} from 'src/redux/actions/recentlyKeyStoreActions';

export default function useCardDeckStorage(keyPrefix, cardDeckId) {
  const dispatch = useDispatch();
  const savedKeyStores = useSelector(
    getKeyStoreMethods(keyPrefix)?.keyStoreSelector,
  );
  const [storedValue, setStoredValue] = useState();
  const [cardDeck, setCardDeck] = useState({});
  // const [libKeystores, setLibKeyStores] = useState([]);
  // const [recentKeyStores, setRecentKeyStores] = useState([]);

  const keyStore = `${keyPrefix}/${cardDeckId}`;

  useEffect(() => {
    fetchCardDeckApi(cardDeckId);
    getMultipleCardDeck(savedKeyStores);
    saveCardDeck(keyStore);
    removeCardDeck(keyStore);
  }, [keyStore, savedKeyStores, cardDeckId]);

  function getKeyStoreMethods(prefix, key) {
    switch (prefix) {
      case KEY?.SAVE_LIB:
        return {
          keyStoreSelector: libraryKeyStoreSelector,
          addKeyStore: addLibraryKeyStore(key),
          removeKeyStore: removeLibraryKeyStore(key),
        };
      case KEY?.RECENTLY_PLAY:
        return {
          keyStoreSelector: recentlyKeyStoresSelector,
          addKeyStore: addRecentlyKeyStore(key),
        };
      default:
        return {};
    }
  }

  async function getCardDeckApiById(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  async function fetchCardDeckApi(id) {
    try {
      await getCardDeckApiById(
        `${api?.HOST}/${api?.PATH}/card-decks/${id}`,
      ).then(data => {
        setCardDeck(data?.data);
      });
    } catch (e) {
      console.log('fetchCardDeckApi error: ', e);
    }
  }

  async function getMultipleCardDeck(keyStores) {
    try {
      const data = await AsyncStorage.multiGet(keyStores);
      const retrievedData = data.map(item => {
        const [key, value] = item || {};
        return value != null ? JSON.parse(value) : null;
      });
      setStoredValue(retrievedData);
      console.log('getMulti cardSlices deck success');
    } catch (e) {
      console.log('getMulti cardSlices deck error: ', e);
    }
  }

  async function saveCardDeck(key) {
    try {
      const jsonValue = JSON.stringify(cardDeck);
      await AsyncStorage.setItem(key, jsonValue);
      dispatch(getKeyStoreMethods(key)?.addKeyStore);
      console.log('save cardSlices deck success');
    } catch (e) {
      console.log('save cardSlices deck error: ', e);
    }
  }

  async function removeCardDeck(key) {
    try {
      await AsyncStorage.removeItem(key);
      dispatch(getKeyStoreMethods(key)?.removeKeyStore());
      console.log('remove cardSlices deck success');
    } catch (e) {
      console.log('remove cardSlices deck error: ', e);
    }
  }

  return {storedValue, saveCardDeck, removeCardDeck};
}
