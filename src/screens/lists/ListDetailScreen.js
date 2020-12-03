import React, { useEffect, useState, useContext, useCallback } from 'react';
import shallow from 'zustand/shallow';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Label from '../../components/utils/Label';
import ListDetailRecipeRow from '../../components/lists/ListDetailRecipeRow';
import ListDetailIngredientRow from '../../components/lists/ListDetailIngredientRow';
import EmptyList from '../../components/utils/EmptyList';

import useListsStore from '../../store/useListsStore';
import kinds from '../../kinds';

export default function ListDetail({ navigation, route }) {
  const id = route.params?.id;

  const [isSwiping, setIsSwiping] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [sections, setSections] = useState([]);
  const { getListById, removeRecipeFromList, updateRecipeNbPersons, checkRecipeIngredient } = useListsStore(
    (state) => ({
      getListById: state.getListById,
      removeRecipeFromList: state.removeRecipeFromList,
      updateRecipeNbPersons: state.updateRecipeNbPersons,
      checkRecipeIngredient: state.checkRecipeIngredient,
    }),
    shallow
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
    labelList: {
      marginVertical: 10,
      marginLeft: 10,
    },
    sectionLabel: {
      marginTop: 10,
      marginLeft: 10,
    },
  });

  const updateStates = useCallback(() => {
    const list = getListById(id);
    if (!list) {
      return;
    }

    const ings = list.recipes.flatMap((recipe) => {
      return recipe.ingredients.map((ingredient) => {
        return {
          ...ingredient,
          quantity: {
            unit: ingredient.quantity.unit,
            value: ((recipe.nbPersons / recipe.nbPersonsBase) * Number(ingredient.quantity.value)).toFixed(2),
          },
          recipeId: recipe.id,
          recipeName: recipe.name,
        };
      });
    });
    setIngredients(ings);
    setRecipes(list.recipes);
  }, [getListById, id]);

  useEffect(() => {
    updateStates();
  }, [updateStates]);

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

  if (recipes.length === 0 && ingredients.length === 0) {
    return (
      <EmptyList
        source={require('../../assets/empty-lists.png')}
        text="Tu n'as pas de listes de courses en cours, crées-en une pour y ajouter tes recettes."
        btnText="Aller aux recettes"
        onPress={() => navigation.navigate('Recipes', { screen: 'Recipes' })}
      />
    );
  }

  return (
    <ScrollView style={styles.container} scrollEnabled={!isSwiping}>
      <Label containerStyle={styles.labelList} label="Recettes de la liste" />
      {recipes.map((recipe, index) => {
        console.log(recipe);
        return (
          <ListDetailRecipeRow
            key={recipe.id}
            name={recipe.name}
            uri={recipe.imageUri}
            nbPersons={recipe.nbPersons}
            nbPersonsBase={recipe.nbPersonsBase}
            index={index}
            setIsSwiping={setIsSwiping}
            removeRecipe={removeRecipe.bind(null, id, recipe.id)}
          />
        );
      })}

      {sections.map((section) => (
        <React.Fragment key={section.title}>
          <Label containerStyle={styles.sectionLabel} label={section.title} />
          {section.data.map((ingredient) => (
            <ListDetailIngredientRow
              key={ingredient.slug + ingredient.recipeId}
              name={ingredient.name}
              recipeName={ingredient.recipeName}
              quantity={ingredient.quantity}
              checked={ingredient.checked}
              onCheck={checkRecipeIngredient.bind(null, id, ingredient.recipeId, ingredient.slug)}
            />
          ))}
        </React.Fragment>
      ))}
    </ScrollView>
  );
}
