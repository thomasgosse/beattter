import create from 'zustand';

import { getMultipleWithRegex, removeData, storeData } from '../services/local-storage';
import { getPrincipalKind } from '../services/ingredient';
import { deleteFile, StoragePath } from '../services/fs';
import { updateIngredients, orderDescTimestamp } from './helper';

const orderDescId = orderDescTimestamp.bind(null, 'id');

const useRecipesStore = create((set, get) => ({
  recipes: [],
  loading: false,
  ingredients: [],
  error: undefined,

  getRecipes: async () => {
    try {
      set({ loading: true });
      const recipes = (await getMultipleWithRegex('recipe_')) || [];
      recipes.sort(orderDescId);
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

  updateRecipeWithIngredients: async (ingredients) => {
    const recipes = [...get().recipes];
    for (const recipe of recipes) {
      ingredients.forEach(([, ingredient]) => {
        const index = recipe.ingredients.findIndex((i) => i.slug === ingredient.slug);
        if (index > -1) {
          delete recipe.ingredients[index].months;
          recipe.ingredients[index] = { ...recipe.ingredients[index], ...ingredient };
        }
      });
      await storeData(`recipe_${recipe.id}`, recipe);
    }
    set({ recipes });
  },

  deleteRecipe: async (id) => {
    try {
      const recipes = [...get().recipes];
      const prevIndex = recipes.findIndex((item) => item.id === id);
      const imageUri = recipes[prevIndex]?.imageUri;
      recipes.splice(prevIndex, 1);
      await removeData(`recipe_${id}`);
      if (imageUri) {
        await deleteFile(`${StoragePath}/${imageUri}`);
      }
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
