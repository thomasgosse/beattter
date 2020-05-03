import AsyncStorage from '@react-native-community/async-storage';

export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('Error while writing value');
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log('Error while getting value');
  }
}
