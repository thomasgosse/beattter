import create from 'zustand';

const useRecipesStore = create((set, get) => ({
  recipes: [],
  loading: false,
  newRecipe: {
    name: '',
    ingredients: [],
  },

  addIngredient: (ingredient) => {
    let newRecipe = { ...get().newRecipe };
    newRecipe.ingredients.push(ingredient);
    set({ newRecipe });
  },

  reset: async () => set({}, true),
}));

export default useRecipesStore;
