import create from 'zustand';

import { getMultipleWithRegex, removeData, storeData } from '../../services/local-storage';

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
  let now = new Date().setHours(0, 0, 0);
  let onGoingLists = [];
  let overLists = [];
  lists.forEach((list) => {
    if (new Date(list.endingDay) < now) {
      overLists.push(list);
    } else {
      onGoingLists.push(list);
    }
  });

  overLists.sort(orderDescStartingDay);
  onGoingLists.sort(orderDescStartingDay);
  set({ lists, overLists, onGoingLists });
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

  createList: async (list) => {
    try {
      set({ loading: true });
      let lists = [...get().lists];
      lists.push(list);
      await storeData(`list_${list.id}`, list);
      updateLists(lists, set);
    } catch (e) {
      console.log('Could not create list', e);
    } finally {
      set({ loading: false });
    }
  },

  isRecipeInList: (listId, recipeId) => {
    const lists = get().lists;
    const index = lists.findIndex((item) => item.id === listId);
    if (index > -1) {
      return lists[index].recipes?.findIndex((recipe) => recipe.id === recipeId) > -1;
    }
    return false;
  },

  incrementRecipe: async (listId, recipeId) => {
    try {
      const lists = [...get().lists];
      const index = lists.findIndex((item) => item.id === listId);
      const recipeIndex = lists[index].recipes.findIndex((recipe) => recipe.id === recipeId);
      lists[index].recipes[recipeIndex].nbTimes
        ? lists[index].recipes[recipeIndex].nbTimes++
        : (lists[index].recipes[recipeIndex].nbTimes = 2);
      await storeData(`list_${listId}`, lists[index]);
      updateLists(lists, set);
    } catch (e) {
      console.log('Could not update list', e);
    }
  },

  addRecipeToList: async (id, recipe) => {
    try {
      const lists = [...get().lists];
      const index = lists.findIndex((item) => item.id === id);
      if (lists[index].recipes?.length > 0) {
        lists[index].recipes.push(recipe);
      } else {
        lists[index].recipes = [recipe];
      }
      await storeData(`list_${id}`, lists[index]);
      updateLists(lists, set);
    } catch (e) {
      console.log('Could not update list', e);
    }
  },

  getListById: (id) => {
    const lists = get().lists;
    return lists.find((item) => item.id === id);
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
