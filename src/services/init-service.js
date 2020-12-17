import axios from 'axios';
import { API_URL } from '@env';

import { getData, storeData } from '../services/local-storage';
import data from '../data';

export async function init() {
  const ingredientsVersion = await getData('ingredients-version');
  if (!ingredientsVersion) {
    await storeData('ingredients', data);
    await storeData('ingredients-version', 1);
  }

  const result = await axios.get(`${API_URL}/getVersion`);
  if (ingredientsVersion === result.data?.version) {
    console.log('Alredy up to date !');
  }
}
