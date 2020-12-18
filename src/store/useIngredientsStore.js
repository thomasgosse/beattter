import create from 'zustand';

import { getMultipleWithRegex } from '../services/local-storage';

const useIngredientsStore = create((set) => ({
  ingredients: [],

  getIngredients: async () => {
    try {
      const ingredients = (await getMultipleWithRegex('ingredient_')) || [];
      set({ ingredients });
    } catch (e) {
      console.error('getIngredients', e);
    }
  },
}));

export default useIngredientsStore;
