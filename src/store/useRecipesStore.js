import create from 'zustand';

import { getMultipleWithRegex, removeData, storeData } from '../services/local-storage';
import { getPrincipalKind } from '../services/ingredient';
import { updateIngredients } from './helper';

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

  updateRecipe: async ({ id, name, nbPersonsBase, ingredients, imageUri }) => {
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
  },

  createRecipe: async (name, nbPersonsBase) => {
    try {
      set({ loading: true });
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
    } catch (e) {
      console.log('Could not create recipe', e);
    } finally {
      set({ loading: false });
    }
  },

  deleteRecipe: async (id) => {
    try {
      const recipes = [...get().recipes];
      const prevIndex = recipes.findIndex((item) => item.id === id);
      recipes.splice(prevIndex, 1);
      await removeData(`recipe_${id}`);
      set({ recipes });
    } catch (e) {
      console.log('Could not delete recipe', e);
    } finally {
      set({ loading: false });
    }
  },

  addIngredient: (ingredient) => {
    let ingredients = [...get().ingredients];
    updateIngredients(ingredients, ingredient);
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
