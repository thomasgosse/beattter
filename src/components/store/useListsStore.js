import create from 'zustand';
import { getMultipleWithRegex, removeData, storeData } from '../../services/local-storage';

const isListOver = (endingDay) => {
  let now = new Date().setHours(0, 0, 0);
  return new Date(endingDay) < now;
};

const orderDescStartingDay = (a, b) => {
  var keyA = new Date(a.startingDay),
    keyB = new Date(b.startingDay);
  if (keyA < keyB) {
    return -1;
  }
  if (keyA > keyB) {
    return 1;
  }
  return 0;
};

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
      console.log('Could not get lists', e);
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
      set({ loading: true });
      let lists = [...get().lists];
      const list = {
        endingDay,
        startingDay,
        name,
        id: Date.now().toString(),
        recipes: [],
      };
      lists.push(list);
      await storeData(`list_${list.id}`, list);
      updateLists(lists, set);
    } catch (e) {
      console.log('Could not create list', e);
    } finally {
      set({ loading: false });
    }
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
      console.log('Could not update list', e);
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
      console.log('Could not remove recipe from list', e);
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

  checkRecipeIngredient: async (listId, recipeId, ingrSlug, value) => {
    try {
      const lists = [...get().lists];
      const index = lists.findIndex((item) => item.id === listId);
      const recipeIndex = lists[index].recipes.findIndex((recipe) => recipe.id === recipeId);
      const ingrIndex = lists[index].recipes[recipeIndex].ingredients.findIndex((ingr) => ingr.slug === ingrSlug);
      lists[index].recipes[recipeIndex].ingredients[ingrIndex].checked = value;
      await storeData(`list_${listId}`, lists[index]);
      updateLists(lists, set);
    } catch (e) {
      console.log('Could not update list', e);
    }
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
      console.log('Could not update list', e);
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
      console.log('Could not delete list', e);
    } finally {
      set({ loading: false });
    }
  },

  reset: async () => set({}, true),
}));

export default useListsStore;
