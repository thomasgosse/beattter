import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Input from '../../utils/Input';
import Button from '../../utils/Button';
import IngredientList from './IngredientList';

import useRecipesStore from '../../store/useRecipesStore';
import PersonPicker from './PersonPicker';

export default function CreateRecipeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [nbPersons, setNbPersons] = useState(2);
  const createRecipe = useRecipesStore((state) => state.createRecipe);
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

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Input
        containerStyle={styles.input}
        label="Nom de la recette"
        placeholder="Risotto de poirreaux"
        value={name}
        setValue={setName}
      />

      <PersonPicker nbPersons={nbPersons} setNbPersons={setNbPersons} />
      <IngredientList label={true} />

      <Button
        text="Créer"
        disabled={!name}
        onPress={() => {
          createRecipe(name, nbPersons);
          navigation.goBack();
        }}
        containerStyle={styles.button}
      />
    </ScrollView>
  );
}
