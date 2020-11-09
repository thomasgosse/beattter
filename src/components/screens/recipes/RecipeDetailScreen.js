import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import shallow from 'zustand/shallow';
import { ThemeContext } from 'react-native-elements';
import isEqual from 'lodash.isequal';

import Input from '../../utils/Input';
import IngredientList from './IngredientList';

import useRecipesStore from '../../store/useRecipesStore';
import PersonPicker from './PersonPicker';

export default function RecipeDetailScreen({ route, navigation }) {
  const ingredient = route.params?.ingredient;
  const id = route.params?.id;

  const [recipe, setRecipe] = useState({});
  const [name, setName] = useState('');
  const [nbPersons, setNbPersons] = useState(2);
  const [ingredients, setIngredients] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { getRecipeById, updateRecipe } = useRecipesStore(
    (state) => ({
      getRecipeById: state.getRecipeById,
      updateRecipe: state.updateRecipe,
    }),
    shallow
  );
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
    },
    container: {
      backgroundColor: colors.body,
    },
    input: { marginHorizontal: 10, marginVertical: 20 },
    button: { alignSelf: 'center', marginVertical: 30 },
  });

  useEffect(() => {
    if (ingredient) {
      setIngredients((ings) => {
        ings.push(ingredient);
        return ings;
      });
      navigation.setParams({ ingredient: null });
    }
  }, [ingredient, navigation]);

  useEffect(() => {
    const r = getRecipeById(id);
    if (!r) {
      return;
    }
    delete r.principalKind;
    setRecipe(r);
    setName(r.name);
    setNbPersons(r.nbPersons);
    setIngredients(r.ingredients);
  }, [id, getRecipeById]);

  useLayoutEffect(() => {
    function onPress() {
      const updatedRecipe = { id: recipe.id, name, nbPersons, ingredients };
      if (!isReadOnly && !isEqual(recipe, updatedRecipe)) {
        updateRecipe(updatedRecipe);
      }
      setIsReadOnly(!isReadOnly);
    }

    navigation.setOptions({
      headerRight: () => <Button title={isReadOnly ? 'Modifier' : 'Terminé'} onPress={onPress} />,
    });
  }, [navigation, updateRecipe, recipe, name, nbPersons, ingredients, isReadOnly]);

  function removeIngredient(index) {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Input
        containerStyle={styles.input}
        label="Nom de la recette"
        placeholder="Risotto de poirreaux"
        value={name}
        setValue={setName}
        isReadOnly={isReadOnly}
      />

      <PersonPicker nbPersons={nbPersons} setNbPersons={setNbPersons} isReadOnly={isReadOnly} />
      <IngredientList
        label={true}
        ingredients={ingredients}
        removeIngredient={removeIngredient}
        isReadOnly={isReadOnly}
        initiatorRoute="RecipeDetail"
      />
    </ScrollView>
  );
}