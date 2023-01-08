import AsyncStorage from '@react-native-async-storage/async-storage';
import {remove, replace, select} from './arrayMethods';

async function hasStoreKeyInStorage(id, mainKey, reduxKeys) {
  try {
    const defaultKeyStore = `${mainKey}/${id}`;
    const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
    const mainKeyRqs = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
    const currentStoreKeys =
      reduxKeys && reduxKeys.length !== 0
        ? reduxKeys.concat(mainKeyRqs)
        : mainKeyRqs;
    return currentStoreKeys.includes(defaultKeyStore);
  } catch (e) {
    console.log('hasStoreKeyInStorage: ', e);
    return e;
  }
}

async function getStoreKeysFromStorage(mainKey, reduxKeys, limit) {
  try {
    const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
    const mainKeyRqs = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
    const currentStoreKeys =
      reduxKeys.length !== 0 ? reduxKeys.concat(mainKeyRqs) : mainKeyRqs;
    const uniqueStoreKeys = select.uniqueElement(currentStoreKeys);
    if (limit) {
      return replace.lastElementWhenExceedLength(uniqueStoreKeys, limit);
    } else {
      return uniqueStoreKeys;
    }
  } catch (e) {
    console.log('getStoreKeysFromStorage: ', e);
    return e;
  }
}

async function getDataFromStorage(mainKey) {
  try {
    const dataRqs = mainKey && (await AsyncStorage.multiGet(mainKey));
    const retrievedData = [];
    dataRqs.forEach(item => {
      const [, value] = item || {};
      value && retrievedData.push(JSON.parse(value));
    });
    return retrievedData;
  } catch (e) {
    console.log('getDataFromStorage: ', e);
    return e;
  }
}

async function saveItemToStorage(id, mainKey, dt) {
  try {
    const keyStore = `${mainKey}/${id}`;
    const jsonValue = JSON.stringify(dt);
    await AsyncStorage.setItem(keyStore, jsonValue);
  } catch (e) {
    console.log('saveItemToStorage: ', e);
  }
}

async function saveKeyStoresToStorage(id, mainKey, limit) {
  try {
    const keyStore = `${mainKey}/${id}`;
    const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
    const storeKeys = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
    storeKeys.unshift(keyStore);
    const uniqueStoreKeys = select.uniqueElement(storeKeys);
    if (limit) {
      replace.lastElementWhenExceedLength(uniqueStoreKeys, limit);
      await AsyncStorage.setItem(mainKey, JSON.stringify(uniqueStoreKeys));
    } else {
      await AsyncStorage.setItem(mainKey, JSON.stringify(uniqueStoreKeys));
    }
  } catch (e) {
    console.log('saveKeyStoresToStorage: ', e);
  }
}

async function removeKeyStoresFromStorage(id, mainKey) {
  try {
    const keyStore = `${mainKey}/${id}`;
    const getMainKeyRqs = await AsyncStorage.getItem(mainKey);
    const storeKeys = !getMainKeyRqs ? [] : JSON.parse(getMainKeyRqs);
    remove.elementAtMiddle(storeKeys, keyStore);
    await AsyncStorage.setItem(mainKey, JSON.stringify(storeKeys));
  } catch (e) {
    console.log('removeKeyStoresFromStorage: ', e);
  }
}

async function removeItemFromStorage(id, mainKey) {
  try {
    const keyStore = `${mainKey}/${id}`;
    await AsyncStorage.removeItem(keyStore);
  } catch (e) {
    console.log('removeItemFromStorage: ', e);
  }
}

export {
  hasStoreKeyInStorage,
  getStoreKeysFromStorage,
  getDataFromStorage,
  saveItemToStorage,
  saveKeyStoresToStorage,
  removeItemFromStorage,
  removeKeyStoresFromStorage,
};
