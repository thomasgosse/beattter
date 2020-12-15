import { getData, storeData } from '../services/local-storage';

export async function init() {
  const ingredientsVersion = await getData('ingredients-version');
  if (!ingredientsVersion) {
    await storeData('ingredients-version', 1);
  }
}
