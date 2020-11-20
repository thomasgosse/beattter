import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import shallow from 'zustand/shallow';

import Input from '../../utils/Input';
import Button from '../../utils/Button';
import IngredientList from './IngredientList';
import PersonPicker from '../PersonPicker';

import useRecipesStore from '../../store/useRecipesStore';

export default function CreateRecipeScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [nbPersonsBase, setNbPersonsBase] = useState(2);
  const { createRecipe, ingredients, removeIngredient, addIngredient } = useRecipesStore(
    (state) => ({
      createRecipe: state.createRecipe,
      ingredients: state.ingredients,
      removeIngredient: state.removeIngredient,
      addIngredient: state.addIngredient,
    }),
    shallow
  );

  useEffect(() => {
    if (route.params?.ingredient) {
      addIngredient(route.params?.ingredient);
      navigation.setParams({ ingredient: null });
    }
  }, [route.params, addIngredient, navigation]);

  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.body,
    },
    input: { marginHorizontal: 10, marginVertical: 20 },
    button: { alignSelf: 'center', marginVertical: 30 },
  });

  return (
    <ScrollView style={styles.container}>
      <Input
        containerStyle={styles.input}
        label="Nom de la recette"
        placeholder="Risotto de poirreaux"
        value={name}
        setValue={setName}
      />

      <PersonPicker nbPersons={nbPersonsBase} setNbPersons={setNbPersonsBase} />
      <IngredientList
        label={true}
        ingredients={ingredients}
        removeIngredient={removeIngredient}
        initiatorRoute="CreateRecipe"
      />

      <Button
        text="Créer"
        disabled={!name}
        onPress={() => {
          createRecipe(name, nbPersonsBase);
          navigation.goBack();
        }}
        containerStyle={styles.button}
      />
    </ScrollView>
  );
}
