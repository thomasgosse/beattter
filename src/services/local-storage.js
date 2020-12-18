import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Error while writing value');
  }
}

export async function getData(key) {
  try {
    return AsyncStorage.getItem(key);
  } catch (e) {
    console.log('Error while getting value');
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error while deleting');
  }
}

export async function getMultipleWithRegex(regex) {
  let keys = await AsyncStorage.getAllKeys();
  if (!keys) {
    return;
  }
  keys = keys.filter((key) => key.startsWith(regex));
  const keyValues = await AsyncStorage.multiGet(keys);
  return keyValues.map(([, value]) => JSON.parse(value));
}

export async function storeMultipleData(keyValuePairs) {
  await AsyncStorage.multiSet(keyValuePairs);
}
