import React, { useContext, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import Ingredient from './Ingredient';
import * as RootNavigation from '../../navigation/RootNavigation';
import Label from '../utils/Label';
import Button from '../utils/Button';

export default function IngredientList({
  label,
  ingredients,
  removeIngredient,
  onPressAddCart,
  nbPersonsBase,
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
    label: {
      marginLeft: 10,
      marginBottom: 7,
    },
    button: {
      marginTop: 20,
      alignSelf: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
    buttonContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: colors.body,
      fontWeight: '500',
      paddingLeft: 10,
      fontSize: 16,
    },
  });

  return (
    <>
      {label && <Label label={`Ingrédients/quantités pour ${nbPersonsBase}`} containerStyle={styles.label} />}
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

      {isReadOnly && (
        <Button containerStyle={styles.button} onPress={onPressAddCart}>
          <View style={styles.buttonContent}>
            <Icon size={22} name="cart-outline" color={colors.body} />
            <Text style={styles.buttonText}>Ajouter à une liste</Text>
          </View>
        </Button>
      )}
    </>
  );
}
