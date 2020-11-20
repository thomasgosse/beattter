import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import shallow from 'zustand/shallow';
import { ThemeContext } from 'react-native-elements';

import PersonPicker from './PersonPicker';
import * as RootNavigation from '../RootNavigation';
import ShoppingListsItem from './lists/ShoppingListsItem';
import Label from '../utils/Label';
import Button from '../utils/Button';

import useListsStore from '../store/useListsStore';

export default function AddRecipeToListScreen({ navigation, route }) {
  const nbPersonsBase = route.params?.recipe?.nbPersonsBase;
  const [nbPersons, setNbPersons] = useState(nbPersonsBase);
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

  useEffect(() => {
    setNbPersons(nbPersonsBase);
  }, [nbPersonsBase]);

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
            onPress: () => {
              updateRecipeNbPersons(listId, route.params?.recipe.id, nbPersons);
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      await addRecipeToList(listId, route.params?.recipe, nbPersons);
      navigation.goBack();
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
