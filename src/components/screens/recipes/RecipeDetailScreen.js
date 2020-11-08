import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Input from '../../utils/Input';
import IngredientList from './IngredientList';

import useRecipesStore from '../../store/useRecipesStore';
import PersonPicker from './PersonPicker';

export default function RecipeDetailScreen({ route, navigation }) {
  const [name, setName] = useState('');
  const [nbPersons, setNbPersons] = useState(2);
  const [ingredients, setIngredients] = useState([]);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const getRecipeById = useRecipesStore((state) => state.getRecipeById);
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
    const r = getRecipeById(route.params.id);
    setName(r.name);
    setNbPersons(r.nbPersons);
    setIngredients(r.ingredients);
  }, [getRecipeById, route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title={isReadOnly ? 'Modifier' : 'Terminé'} onPress={() => setIsReadOnly(!isReadOnly)} />
      ),
    });
  }, [navigation, isReadOnly]);

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

      <PersonPicker nbPersons={nbPersons} setNbPersons={setNbPersons} />
      <IngredientList label={true} ingredients={ingredients} removeIngredient={removeIngredient} />
    </ScrollView>
  );
}
