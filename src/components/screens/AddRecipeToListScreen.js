import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import shallow from 'zustand/shallow';
import { ThemeContext } from 'react-native-elements';

import * as RootNavigation from '../RootNavigation';
import ShoppingListsItem from './lists/ShoppingListsItem';
import Label from '../utils/Label';
import Button from '../utils/Button';

import useListsStore from '../store/useListsStore';

export default function AddRecipeToListScreen({ navigation, route }) {
  const { lists, addRecipeToList, isRecipeInList, incrementRecipe } = useListsStore(
    (state) => ({
      lists: state.onGoingLists,
      addRecipeToList: state.addRecipeToList,
      incrementRecipe: state.incrementRecipe,
      isRecipeInList: state.isRecipeInList,
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
      marginTop: 10,
      marginBottom: 7,
      marginLeft: 10,
    },
    button: {
      marginTop: 20,
      alignSelf: 'center',
    },
  });

  async function onPressAddToList(listId) {
    if (isRecipeInList(listId, route.params?.recipe.id)) {
      Alert.alert(
        'Souhaitez vous ajouter une nouvelle fois cette recette ?',
        'Elle est déja présente dans cette liste',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              incrementRecipe(listId, route.params?.recipe.id);
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      await addRecipeToList(listId, route.params?.recipe);
      navigation.goBack();
    }
  }

  return (
    <ScrollView style={styles.container}>
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
