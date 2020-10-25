import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';

import Ingredient from './Ingredient';
import * as RootNavigation from '../../RootNavigation';

import useRecipesStore from '../../store/useRecipesStore';

export default function IngredientList({ label }) {
  const ingredients = useRecipesStore((state) => state.ingredients);

  const listItemHeight = 60;
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    listItem: {
      height: listItemHeight,
      backgroundColor: colors.listRow,
    },
    label: {
      marginBottom: 7,
      fontWeight: '500',
      fontSize: 16,
      color: colors.textBaseLight,
      marginLeft: 10,
    },
  });

  return (
    <>
      {label && <Text style={styles.label}>Ingredients</Text>}

      {ingredients.map((ingredient, i) => (
        <Ingredient ingredient={ingredient} index={i} key={ingredient.name + i} itemHeight={listItemHeight} />
      ))}

      <ListItem
        containerStyle={styles.listItem}
        bottomDivider
        topDivider={ingredients.length === 0}
        onPress={() => RootNavigation.navigate('IngredientPick')}
      >
        <ListItem.Content>
          <ListItem.Chevron name="add-circle-outline" type="ionicon" size={30} color={colors.textBaseLight} />
        </ListItem.Content>
      </ListItem>
    </>
  );
}
