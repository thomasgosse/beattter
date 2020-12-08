import create from 'zustand';
import { getMultipleWithRegex, removeData, storeData } from '../services/local-storage';
import { updateIngredients, orderDescStartingDay, isListOver } from './helper';

function updateLists(lists, set) {
  let onGoingLists = [];
  let overLists = [];
  lists.forEach((list) => {
    if (isListOver(list.endingDay)) {
      overLists.push(list);
    } else {
      onGoingLists.push(list);
    }
  });

  overLists.sort(orderDescStartingDay);
  onGoingLists.sort(orderDescStartingDay);
  set({ lists, overLists, onGoingLists });
}

function updateRecipe(recipe, update) {
  const cachedIngredients = [...recipe.ingredients];
  let updatedRecipe = { ...recipe, ...update };
  for (let ingredient of updatedRecipe.ingredients) {
    const i = cachedIngredients.findIndex((ingr) => ingr.slug === ingredient.slug);
    if (i > -1) {
      ingredient.checked = !!cachedIngredients[i].checked;
    }
  }
  return updatedRecipe;
}

const useListsStore = create((set, get) => ({
  lists: [],
  onGoingLists: [],
  overLists: [],
  loading: false,

  getLists: async () => {
    try {
      set({ loading: true });
      const lists = (await getMultipleWithRegex('list_')) || [];
      updateLists(lists, set);
    } catch (e) {
      console.log('getLists', e);
    } finally {
      set({ loading: false });
    }
  },

  getListById: (id) => {
    const lists = get().lists;
    return lists.find((item) => item.id === id);
  },

  createList: async (endingDay, startingDay, name) => {
    try {
      let lists = [...get().lists];
      const list = {
        endingDay,
        startingDay,
        name,
        id: Date.now().toString(),
        recipes: [],
        ingredients: [],
      };
      lists.push(list);
      await storeData(`list_${list.id}`, list);
      updateLists(lists, set);
    } catch (e) {
      console.log('getListById', e);
    }
  },

  addIngredient: async (ingredient, listId) => {
    const lists = [...get().lists];
    const index = lists.findIndex((item) => item.id === listId);
    lists[index].ingredients = updateIngredients(lists[index].ingredients, ingredient);
    await storeData(`list_${listId}`, lists[index]);
    updateLists(lists, set);
  },

  deleteIngredient: async (listId, ingrSlug) => {
    const lists = [...get().lists];
    const index = lists.findIndex((item) => item.id === listId);
    const ingrIndex = lists[index].ingredients?.findIndex((ingr) => ingr.slug === ingrSlug);
    lists[index].ingredients.splice(ingrIndex, 1);
    await storeData(`list_${listId}`, lists[index]);
    updateLists(lists, set);
  },

  addRecipeToList: async (listId, recipe, nbPersons) => {
    try {
      recipe.nbPersons = nbPersons;
      const lists = [...get().lists];
      const index = lists.findIndex((item) => item.id === listId);
      lists[index].recipes.push(recipe);
      await storeData(`list_${listId}`, lists[index]);
      updateLists(lists, set);
    } catch (e) {
      console.log('addRecipeToList', e);
    }
  },

  removeRecipeFromList: async (listId, recipeId) => {
    try {
      const lists = [...get().lists];
      const index = lists.findIndex((item) => item.id === listId);
      const recipeIndex = lists[index].recipes.findIndex((recipe) => recipe.id === recipeId);
      lists[index].recipes.splice(recipeIndex, 1);
      await storeData(`list_${listId}`, lists[index]);
      updateLists(lists, set);
    } catch (e) {
      console.log('removeRecipeFromList', e);
    }
  },

  updateRecipeInOngoingLists: async (r) => {
    let recipeUpdate = JSON.parse(JSON.stringify(r));
    let modifiedLists = [];
    const lists = await Promise.all(
      get().lists.map(async (list) => {
        if (isListOver(list.endingDay)) {
          return list;
        }
        const recipeIndex = list.recipes.findIndex((recipe) => recipe.id === recipeUpdate.id);
        if (recipeIndex > -1) {
          list.recipes[recipeIndex] = updateRecipe(list.recipes[recipeIndex], recipeUpdate);
          modifiedLists.push(list.name);
          await storeData(`list_${list.id}`, list);
        }
        return list;
      })
    );
    updateLists(lists, set);
    return modifiedLists;
  },

  isRecipeInList: (listId, recipeId) => {
    const lists = get().lists;
    const index = lists.findIndex((item) => item.id === listId);
    if (index > -1) {
      return lists[index].recipes?.findIndex((recipe) => recipe.id === recipeId) > -1;
    }
    return false;
  },

  checkIngredient: async (listId, ingrSlug, value) => {
    const lists = [...get().lists];
    const index = lists.findIndex((item) => item.id === listId);
    const ingrIndex = lists[index].ingredients.findIndex((ingr) => ingr.slug === ingrSlug);
    lists[index].ingredients[ingrIndex].checked = value;
    await storeData(`list_${listId}`, lists[index]);
    updateLists(lists, set);
  },

  checkRecipeIngredient: async (listId, recipeId, ingrSlug, value) => {
    const lists = [...get().lists];
    const index = lists.findIndex((item) => item.id === listId);
    const recipeIndex = lists[index].recipes.findIndex((recipe) => recipe.id === recipeId);
    const ingrIndex = lists[index].recipes[recipeIndex].ingredients.findIndex((ingr) => ingr.slug === ingrSlug);
    lists[index].recipes[recipeIndex].ingredients[ingrIndex].checked = value;
    await storeData(`list_${listId}`, lists[index]);
    updateLists(lists, set);
  },

  updateRecipeNbPersons: async (listId, recipeId, value) => {
    try {
      const lists = [...get().lists];
      const index = lists.findIndex((item) => item.id === listId);
      const recipeIndex = lists[index].recipes.findIndex((recipe) => recipe.id === recipeId);
      lists[index].recipes[recipeIndex].nbPersons += value;
      await storeData(`list_${listId}`, lists[index]);
      updateLists(lists, set);
    } catch (e) {
      console.log('updateRecipeNbPersons', e);
    }
  },

  deleteList: async (id) => {
    try {
      const lists = [...get().lists];
      const prevIndex = lists.findIndex((item) => item.id === id);
      lists.splice(prevIndex, 1);
      await removeData(`list_${id}`);
      updateLists(lists, set);
    } catch (e) {
      console.log('deleteList', e);
    }
  },

  reset: async () => set({}, true),
}));

export default useListsStore;
