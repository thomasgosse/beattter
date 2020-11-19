import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Button as RNButton, Alert } from 'react-native';
import shallow from 'zustand/shallow';
import { ThemeContext } from 'react-native-elements';
import isEqual from 'lodash.isequal';

import Button from '../../utils/Button';
import Input from '../../utils/Input';
import IngredientList from './IngredientList';
import PersonPicker from './PersonPicker';

import useRecipesStore from '../../store/useRecipesStore';
import useListsStore from '../../store/useListsStore';

export default function RecipeDetailScreen({ route, navigation }) {
  const ingredient = route.params?.ingredient;
  const id = route.params?.id;

  const [recipe, setRecipe] = useState({});
  const [name, setName] = useState('');
  const [nbPersonsBase, setNbPersonsBase] = useState(2);
  const [ingredients, setIngredients] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { getRecipeById, updateRecipe, deleteRecipe } = useRecipesStore(
    (state) => ({
      getRecipeById: state.getRecipeById,
      updateRecipe: state.updateRecipe,
      deleteRecipe: state.deleteRecipe,
    }),
    shallow
  );
  const updateRecipeInOngoingLists = useListsStore((state) => state.updateRecipeInOngoingLists);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.body,
    },
    input: { marginHorizontal: 10, marginVertical: 20 },
    button: { alignSelf: 'center', marginVertical: 30 },
    deleteButtton: {
      alignSelf: 'center',
      marginVertical: 30,
      backgroundColor: colors.danger,
      borderWidth: 0,
    },
  });

  useEffect(() => {
    if (ingredient) {
      let ings = [...ingredients];
      ings.push(ingredient);
      setIngredients(ings);
      navigation.setParams({ ingredient: null });
    }
  }, [ingredient, ingredients, navigation]);

  useEffect(() => {
    const r = getRecipeById(id);
    if (!r) {
      return;
    }
    delete r.principalKind;
    setRecipe(r);
    setName(r.name);
    setNbPersonsBase(r.nbPersonsBase);
    setIngredients(r.ingredients);
  }, [id, getRecipeById]);

  useLayoutEffect(() => {
    async function onPress() {
      const recipeUpdate = { id: recipe.id, name, nbPersonsBase, ingredients };
      if (!isReadOnly && !isEqual(recipe, recipeUpdate)) {
        await updateRecipe(recipeUpdate);
        await updateRecipeInOngoingLists(recipeUpdate);
        setRecipe(recipeUpdate);
      }
      setIsReadOnly(!isReadOnly);
    }

    navigation.setOptions({
      headerRight: () => <RNButton title={isReadOnly ? 'Modifier' : 'Terminé'} onPress={onPress} />,
    });
  }, [navigation, updateRecipe, updateRecipeInOngoingLists, recipe, name, nbPersonsBase, ingredients, isReadOnly]);

  function removeIngredient(index) {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  }

  function onPressDelete() {
    Alert.alert(
      'Souhaitez vous supprimer cette recette ?',
      '',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteRecipe(id);
            navigation.goBack();
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Input
        containerStyle={styles.input}
        label="Nom de la recette"
        placeholder="Risotto de poirreaux"
        value={name}
        setValue={setName}
        isReadOnly={isReadOnly}
      />

      <PersonPicker nbPersons={nbPersonsBase} setNbPersons={setNbPersonsBase} isReadOnly={isReadOnly} />
      <IngredientList
        label={true}
        ingredients={ingredients}
        removeIngredient={removeIngredient}
        isReadOnly={isReadOnly}
        initiatorRoute="RecipeDetail"
        onPressAddCart={() => {
          navigation.navigate('AddRecipeToList', {
            screen: 'Ajouter à une liste',
            params: { recipe: { id, name, nbPersonsBase, ingredients: JSON.parse(JSON.stringify(ingredients)) } },
          });
        }}
      />

      {!isReadOnly && <Button text="Supprimer" containerStyle={styles.deleteButtton} onPress={onPressDelete} />}
    </ScrollView>
  );
}
