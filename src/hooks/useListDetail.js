import { useEffect, useState, useCallback } from 'react';
import useListsStore from '../store/useListsStore';
import { isListOver } from '../store/helper';

import kinds from '../kinds';

export default function useListDetail(id, route, navigation) {
  const [isOver, setIsOver] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [sections, setSections] = useState([]);

  const getListById = useListsStore.getState().getListById;
  const addIngredient = useListsStore.getState().addIngredient;
  const removeRecipeFromList = useListsStore.getState().removeRecipeFromList;
  const deleteIngredient = useListsStore.getState().deleteIngredient;
  const updateRecipeNbPersons = useListsStore.getState().updateRecipeNbPersons;

  const updateStates = useCallback(() => {
    const list = getListById(id);
    if (!list) {
      return;
    }

    let ings = list.recipes.flatMap((recipe) => {
      return recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: {
          unit: ingredient.quantity.unit,
          value: ((recipe.nbPersons / recipe.nbPersonsBase) * Number(ingredient.quantity.value)).toFixed(2),
        },
        recipeId: recipe.id,
        recipeName: recipe.name,
      }));
    });
    list.ingredients?.forEach((ingredient) => {
      ings.push({ ...ingredient, recipeId: 'detached', recipeName: '' });
    });

    setIngredients(ings);
    setRecipes(list.recipes);
    setIsOver(isListOver(list.endingDay));
  }, [getListById, id]);

  useEffect(() => {
    if (route.params?.ingredient) {
      addIngredient(route.params?.ingredient, id).then(() => {
        navigation.setParams({ ingredient: null });
      });
    }
    updateStates();
  }, [route.params, id, navigation, addIngredient, updateStates]);

  useEffect(() => {
    const updatedSections = ingredients.reduce((acc, val) => {
      const index = acc.findIndex((section) => section.title === kinds[val.kind].description);
      if (index > -1) {
        acc[index].data.push(val);
      } else {
        acc.push({ title: kinds[val.kind].description, data: [val] });
      }
      return acc;
    }, []);
    setSections(updatedSections);
  }, [ingredients, setSections]);

  async function removeRecipe(listId, recipeId, remove, nbPersonsToRemove) {
    if (remove) {
      await removeRecipeFromList(listId, recipeId);
    } else {
      await updateRecipeNbPersons(listId, recipeId, -nbPersonsToRemove);
    }
    updateStates();
  }

  async function removeIngredient(listId, ingrSlug) {
    await deleteIngredient(listId, ingrSlug);
    updateStates();
  }

  return { recipes, sections, ingredients, isOver, removeRecipe, removeIngredient };
}
