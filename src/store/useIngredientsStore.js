import create from 'zustand';

import { getData } from '../services/local-storage';

const useIngredientsStore = create((set) => ({
  ingredients: [],

  getIngredients: async () => {
    try {
      const rawIngredients = await getData('ingredients');
      const ingredients = JSON.parse(rawIngredients);
      set({ ingredients });
    } catch (e) {
      console.error('getIngredients', e);
    }
  },
}));

export default useIngredientsStore;
