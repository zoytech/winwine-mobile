import AsyncStorage from '@react-native-async-storage/async-storage';
import {remove, replace, select} from './arrayMethods';

async function getItemStorage(key, initData) {
  const getMainKeyRqs = await AsyncStorage.getItem(key);
  return getMainKeyRqs ? JSON.parse(getMainKeyRqs) : initData;
}

async function setItemStorage(key, data) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

async function getMultiStorage(keys, initData) {
  const rawDataRqs = await AsyncStorage.multiGet(keys);
  const rawData = !rawDataRqs ? [] : rawDataRqs;
  const retrievedData = [];
  rawData.forEach(item => {
    const [, value] = item || initData;
    value && retrievedData.push(JSON.parse(value));
  });
  return retrievedData;
}

function convertIdToStorageKey(id, prefix, suffix) {
  const customPrefix = prefix ? `${prefix}/` : '';
  const customSuffix = suffix ? `/${suffix}` : '';
  return `${customPrefix}${id}${customSuffix}`;
}

function convertStorageKeyToId(key, prefix, suffix) {
  if (prefix) {
    return key.replace(`${prefix}/`, '');
  } else if (suffix) {
    return key.replace(`/${suffix}`, '');
  } else {
    return key;
  }
}

function processAddCounterKeyToStorage(queryKey, counterKeys = {}) {
  const hasCounterKey = counterKeys.hasOwnProperty(queryKey);
  if (!hasCounterKey) {
    counterKeys[queryKey] = 1;
    return {counterKeys: counterKeys, hasCounterKey: hasCounterKey};
  } else {
    return {counterKeys: null, hasCounterKey: hasCounterKey};
  }
}

export {
  convertIdToStorageKey,
  convertStorageKeyToId,
  getItemStorage,
  setItemStorage,
  getMultiStorage,
  processAddCounterKeyToStorage,
};
