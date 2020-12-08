import React, { useContext, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import Ingredient from './Ingredient';
import * as RootNavigation from '../../navigation/RootNavigation';
import Label from '../utils/Label';

export default function IngredientList({
  label,
  ingredients,
  removeIngredient,
  onPressAddCart,
  isReadOnly,
  initiatorRoute,
  setIsSwiping,
}) {
  const listItemHeight = 60;
  const hasTransitioned = useRef(false);
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    listItem: {
      backgroundColor: colors.listRow,
    },
    labelContainer: { flexDirection: 'row', marginBottom: 7, alignItems: 'center' },
    label: {
      marginLeft: 10,
    },
    labelAction: {
      marginLeft: 10,
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 999999,
      backgroundColor: colors.listRow,
    },
  });

  return (
    <>
      <View style={styles.labelContainer}>
        {label && <Label label="Ingrédients" containerStyle={styles.label} />}
        {initiatorRoute !== 'CreateRecipe' && (
          <TouchableOpacity style={styles.labelAction} onPress={onPressAddCart}>
            <Icon size={24} name="cart-outline" color={colors.textTitleLighter} />
          </TouchableOpacity>
        )}
      </View>

      {ingredients.map((ingredient, i) => (
        <Ingredient
          ingredient={ingredient}
          index={i}
          key={ingredient.name + JSON.stringify(ingredient.quantity)}
          itemHeight={listItemHeight}
          removeIngredient={removeIngredient}
          isReadOnly={isReadOnly}
          hasTransitioned={hasTransitioned}
          setIsSwiping={setIsSwiping}
        />
      ))}

      {!isReadOnly && (
        <View style={styles.listItem}>
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
        </View>
      )}
    </>
  );
}
