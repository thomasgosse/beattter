import create from 'zustand';

import { getMultipleWithRegex, removeData, storeData } from '../../services/local-storage';
import { getPrincipalKind } from '../../services/ingredient';

const useRecipesStore = create((set, get) => ({
  recipes: [],
  loading: false,
  ingredients: [],

  getRecipes: async () => {
    try {
      set({ loading: true });
      const recipes = (await getMultipleWithRegex('recipe_')) || [];
      set({ recipes });
    } catch (e) {
      console.log('Could not get recipes', e);
    } finally {
      set({ loading: false });
    }
  },

  getRecipeById: (id) => {
    let recipes = get().recipes;
    return recipes.find((recipe) => recipe.id === id);
  },

  createRecipe: async (name, nbPersons) => {
    try {
      set({ loading: true });
      let recipes = [...get().recipes];
      const ingredients = get().ingredients;
      const newRecipe = {
        id: Date.now(),
        name,
        nbPersons,
        principalKind: getPrincipalKind(ingredients),
        ingredients,
      };
      recipes.push(newRecipe);
      await storeData(`recipe_${newRecipe.id}`, newRecipe);
      set({ recipes, ingredients: [] });
    } catch (e) {
      console.log('Could not create recipe', e);
    } finally {
      set({ loading: false });
    }
  },

  deleteList: async (id) => {
    try {
      const recipes = [...get().recipes];
      const prevIndex = recipes.findIndex((item) => item.id === id);
      recipes.splice(prevIndex, 1);
      await removeData(`list_${id}`);
      set({ recipes });
    } catch (e) {
      console.log('Could not delete list', e);
    } finally {
      set({ loading: false });
    }
  },

  addIngredient: (ingredient) => {
    let ingredients = [...get().ingredients];
    ingredients.push(ingredient);
    set({ ingredients });
  },

  removeIngredient: (index) => {
    let ingredients = [...get().ingredients];
    ingredients.splice(index, 1);
    set({ ingredients });
  },

  reset: async () => set({}, true),
}));

export default useRecipesStore;
