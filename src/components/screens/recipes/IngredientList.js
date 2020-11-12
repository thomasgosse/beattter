import React, { useContext, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import Ingredient from './Ingredient';
import * as RootNavigation from '../../RootNavigation';
import Label from '../../utils/Label';

export default function IngredientList({
  label,
  ingredients,
  removeIngredient,
  onPressAddCart,
  isReadOnly,
  initiatorRoute,
}) {
  const listItemHeight = 60;
  const animatedHeight = useRef(new Animated.Value(1)).current;
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

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isReadOnly ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isReadOnly, animatedHeight]);

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
          key={ingredient.name + ingredient.quantity}
          itemHeight={listItemHeight}
          removeIngredient={removeIngredient}
          isReadOnly={isReadOnly}
        />
      ))}

      <Animated.View
        style={[
          styles.listItem,
          {
            height: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, listItemHeight],
            }),
          },
        ]}
      >
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
      </Animated.View>
    </>
  );
}
