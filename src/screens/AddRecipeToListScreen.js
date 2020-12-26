import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import shallow from 'zustand/shallow';
import { ThemeContext } from 'react-native-elements';

import PersonPicker from '../components/utils/PersonPicker';
import * as RootNavigation from '../navigation/RootNavigation';
import ShoppingListsItem from '../components/lists/ShoppingListsItem';
import Label from '../components/utils/Label';
import Button from '../components/utils/Button';

import useListsStore from '../store/useListsStore';

export default function AddRecipeToListScreen({ navigation, route }) {
  const [nbPersons, setNbPersons] = useState(route.params?.recipe.nbPersonsBase);
  const { lists, addRecipeToList, isRecipeInList, updateRecipeNbPersons } = useListsStore(
    (state) => ({
      lists: state.onGoingLists,
      addRecipeToList: state.addRecipeToList,
      isRecipeInList: state.isRecipeInList,
      updateRecipeNbPersons: state.updateRecipeNbPersons,
    }),
    shallow
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.body,
    },
    label: {
      marginBottom: 7,
      marginLeft: 10,
    },
    personPicker: {
      marginTop: 20,
    },
    button: {
      marginTop: 20,
      alignSelf: 'center',
    },
  });

  async function onPressAddToList(listId) {
    if (isRecipeInList(listId, route.params?.recipe.id)) {
      Alert.alert(
        `Cuisiner cette recette pour ${nbPersons} personne(s) de plus ?`,
        'Elle est déja présente dans cette liste de courses',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const result = await updateRecipeNbPersons(listId, route.params?.recipe.id, nbPersons);
              result && navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      const result = await addRecipeToList(listId, route.params?.recipe, nbPersons);
      result && navigation.goBack();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.personPicker}>
        <PersonPicker label="Pour combien allez vous cuisiner ?" nbPersons={nbPersons} setNbPersons={setNbPersons} />
      </View>
      <Label label="Listes en cours" containerStyle={styles.label} />
      {lists.map((list) => (
        <ShoppingListsItem
          key={list.id}
          item={list}
          itemHeight={80}
          chevronIcon="add-outline"
          onPress={() => onPressAddToList(list.id)}
        />
      ))}
      <Button
        text="Créer une liste"
        containerStyle={styles.button}
        onPress={() => RootNavigation.navigate('CreateList')}
      />
    </ScrollView>
  );
}
