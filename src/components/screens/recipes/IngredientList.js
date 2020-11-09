import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';

import Ingredient from './Ingredient';
import * as RootNavigation from '../../RootNavigation';
import Label from '../../utils/Label';

export default function IngredientList({ label, ingredients, removeIngredient, isReadOnly, initiatorRoute }) {
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
      marginLeft: 10,
    },
  });

  return (
    <>
      {label && <Label label="Ingrédients" containerStyle={styles.label} />}

      {ingredients.map((ingredient, i) => (
        <Ingredient
          ingredient={ingredient}
          index={i}
          key={ingredient.name + ingredient.quantity}
          itemHeight={listItemHeight}
          removeIngredient={removeIngredient}
          isReadOnly={isReadOnly}
        />
      ))}

      {!isReadOnly && (
        <ListItem
          containerStyle={styles.listItem}
          bottomDivider
          topDivider={ingredients.length === 0}
          onPress={() =>
            RootNavigation.navigate('IngredientPick', {
              screen: 'Ajouter un ingrédient',
              params: {
                initiatorRoute,
              },
            })
          }
        >
          <ListItem.Content>
            <ListItem.Chevron name="add-circle-outline" type="ionicon" size={30} color={colors.iconBtn} />
          </ListItem.Content>
        </ListItem>
      )}
    </>
  );
}
