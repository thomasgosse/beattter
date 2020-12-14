import create from 'zustand';

import { getMultipleWithRegex, removeData, storeData } from '../services/local-storage';
import { getPrincipalKind } from '../services/ingredient';
import { updateIngredients } from './helper';

const useRecipesStore = create((set, get) => ({
  recipes: [],
  loading: false,
  ingredients: [],
  error: undefined,

  getRecipes: async () => {
    try {
      set({ loading: true });
      const recipes = (await getMultipleWithRegex('recipe_')) || [];
      set({ recipes });
    } catch (e) {
      set({ error: 'getRecipes' });
    } finally {
      set({ loading: false });
    }
  },

  getRecipeById: (id) => {
    let recipes = get().recipes;
    return recipes.find((recipe) => recipe.id === id);
  },

  createRecipe: async (name, nbPersonsBase) => {
    try {
      let recipes = [...get().recipes];
      const ingredients = get().ingredients;
      const newRecipe = {
        id: Date.now(),
        name,
        nbPersonsBase,
        principalKind: getPrincipalKind(ingredients),
        ingredients,
        imageUri: '',
      };
      recipes.push(newRecipe);
      await storeData(`recipe_${newRecipe.id}`, newRecipe);
      set({ recipes, ingredients: [] });
      return true;
    } catch (e) {
      set({ error: 'createRecipe' });
    }
  },

  updateRecipe: async ({ id, name, nbPersonsBase, ingredients, imageUri }) => {
    try {
      const updatedRecipe = {
        id,
        name,
        nbPersonsBase,
        principalKind: getPrincipalKind(ingredients),
        ingredients,
        imageUri,
      };
      await storeData(`recipe_${updatedRecipe.id}`, updatedRecipe);
      let recipes = [...get().recipes];
      const index = recipes.findIndex((recipe) => recipe.id === id);
      recipes[index] = updatedRecipe;
      set({ recipes });
      return true;
    } catch (e) {
      set({ error: 'updateRecipe' });
    }
  },

  deleteRecipe: async (id) => {
    try {
      const recipes = [...get().recipes];
      const prevIndex = recipes.findIndex((item) => item.id === id);
      recipes.splice(prevIndex, 1);
      await removeData(`recipe_${id}`);
      set({ recipes });
      return true;
    } catch (e) {
      set({ error: 'deleteRecipe' });
    }
  },

  addIngredient: (ingredient) => {
    let ingredients = [...get().ingredients];
    ingredients = updateIngredients(ingredients, ingredient);
    set({ ingredients });
  },

  removeIngredient: (index) => {
    let ingredients = [...get().ingredients];
    ingredients.splice(index, 1);
    set({ ingredients });
  },

  resetError: () => set({ error: undefined }),
  reset: async () => set({}, true),
}));

export default useRecipesStore;
