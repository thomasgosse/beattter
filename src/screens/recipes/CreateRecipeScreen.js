import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import shallow from 'zustand/shallow';

import Input from '../../components/utils/Input';
import Button from '../../components/utils/Button';
import IngredientList from '../../components/recipes/IngredientList';
import PersonPicker from '../../components/utils/PersonPicker';

import useRecipesStore from '../../store/useRecipesStore';

export default function CreateRecipeScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [isSwiping, setIsSwiping] = useState(false);
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
    <ScrollView style={styles.container} scrollEnabled={!isSwiping}>
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
        setIsSwiping={setIsSwiping}
      />

      <Button
        text="Créer"
        disabled={!name}
        onPress={async () => {
          const result = await createRecipe(name, nbPersonsBase);
          result && navigation.goBack();
        }}
        containerStyle={styles.button}
      />
    </ScrollView>
  );
}
