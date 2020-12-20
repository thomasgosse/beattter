import axios from 'axios';
import { API_URL } from '@env';

import { getData, storeData, storeMultipleData } from '../services/local-storage';
import useRecipesStore from '../store/useRecipesStore';
import data from '../data';

const BASE_VERSION = 1;

async function updateIngredients(ingredients, version) {
  const keyValuePairs = ingredients.map((item) => [`ingredient_${item.slug}`, item]);
  await storeMultipleData(keyValuePairs);
  await useRecipesStore.getState().updateRecipeWithIngredients(keyValuePairs);
  // à faire en même temps que les synthèses/affichage de la non-saisonnalité des ingredients
  // feat/useListsStore.updateListsWithIngredients: update ingredients and recipes ingredients
  await storeData('version', version);
  console.log(`Added/updated ${keyValuePairs.length}, and set version to ${version}`);
  return version;
}

async function fetchAndUpdateIngredients(version) {
  const result = await axios.get(`${API_URL}/getIngredients?version=${version}`);
  await updateIngredients(result.data, version);
}

async function updateIngredientsToLatest(latestVersion, localVersion) {
  let currentVersion = localVersion + 1;
  while (latestVersion >= currentVersion) {
    await fetchAndUpdateIngredients(currentVersion);
    currentVersion += 1;
  }
}

export async function init() {
  try {
    let localVersion = await getData('version');
    if (!localVersion) {
      await updateIngredients(data, BASE_VERSION);
      localVersion = BASE_VERSION;
    }

    localVersion = Number(localVersion);
    const result = await axios.get(`${API_URL}/getVersion`);
    const latestVersion = result.data?.version;
    if (latestVersion > localVersion) {
      await updateIngredientsToLatest(latestVersion, localVersion);
    }
  } catch (e) {
    console.error('Something went wrong', e);
  }
}
