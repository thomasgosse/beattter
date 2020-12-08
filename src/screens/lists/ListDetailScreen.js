import React, { useLayoutEffect, useState, useContext, useRef } from 'react';
import shallow from 'zustand/shallow';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeArea } from 'react-native-safe-area-context';

import Label from '../../components/utils/Label';
import ListDetailRecipeRow from '../../components/lists/ListDetailRecipeRow';
import ListDetailIngredientRow from '../../components/lists/ListDetailIngredientRow';
import EmptyList from '../../components/utils/EmptyList';
import ListDetailDualButton from '../../components/lists/ListDetailDualButton';

import useListsStore from '../../store/useListsStore';
import useListDetail from '../../hooks/useListDetail';

export default function ListDetail({ navigation, route }) {
  const id = route.params?.id;
  const hasTransitioned = useRef(false);

  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isSwiping, setIsSwiping] = useState(false);
  const { checkRecipeIngredient, checkIngredient } = useListsStore(
    (state) => ({
      checkRecipeIngredient: state.checkRecipeIngredient,
      checkIngredient: state.checkIngredient,
    }),
    shallow
  );
  const { recipes, sections, ingredients, isOver, removeRecipe, removeIngredient } = useListDetail(
    id,
    route,
    navigation
  );

  const insets = useSafeArea();
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
    labelList: {
      marginVertical: 10,
      marginLeft: 10,
    },
    sectionLabel: {
      marginTop: 10,
      marginLeft: 10,
    },
    isOver: {
      marginTop: 10,
      marginHorizontal: 10,
      borderRadius: 8,
      backgroundColor: colors.success,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    isOverText: {
      color: colors.header,
      fontSize: 16,
      fontWeight: '500',
      marginRight: 10,
    },
    headerRight: {
      fontSize: 18,
      color: Platform.OS === 'ios' ? colors.iOSDefault : colors.androidDefault,
      fontWeight: isReadOnly ? '400' : '600',
    },
  });

  useLayoutEffect(() => {
    if (isOver) {
      navigation.setOptions({ headerRight: () => {} });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => setIsReadOnly(!isReadOnly)}>
            <Text style={styles.headerRight}>{isReadOnly ? 'Modifier' : 'OK'}</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, isReadOnly, isOver, styles.headerRight]);

  function getCheckFunction(recipeId, ingrSlug) {
    if (recipeId === 'detached') {
      return checkIngredient.bind(null, id, ingrSlug);
    } else {
      return checkRecipeIngredient.bind(null, id, recipeId, ingrSlug);
    }
  }

  const dualButton = (
    <ListDetailDualButton
      firstOnPress={() =>
        navigation.navigate('IngredientPick', {
          screen: 'Ajouter un ingrédient',
          params: {
            initiatorRoute: 'ListDetail',
          },
        })
      }
      secondOnPress={() => navigation.navigate('Recipes', { screen: 'Recipes' })}
    />
  );

  if (recipes.length === 0 && ingredients.length === 0) {
    return (
      <EmptyList
        source={require('../../assets/empty-lists.png')}
        text="Tu n'as pas d'ingrédients dans ta liste, ajoutes-en en cherchant, ou via tes recettes."
        btnText="Aller aux recettes"
      >
        {dualButton}
      </EmptyList>
    );
  }

  return (
    <>
      {isOver && (
        <View style={styles.isOver}>
          <Text style={styles.isOverText}>Cette liste est en lecture seule</Text>
          <Icon name="lock-closed" size={24} color={colors.header} />
        </View>
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        scrollEnabled={!isSwiping}
      >
        <Label containerStyle={styles.labelList} label="Recettes de la liste" />
        {recipes.map((recipe, index) => (
          <ListDetailRecipeRow
            key={recipe.id}
            name={recipe.name}
            uri={recipe.imageUri}
            nbPersons={recipe.nbPersons}
            nbPersonsBase={recipe.nbPersonsBase}
            index={index}
            setIsSwiping={setIsSwiping}
            removeRecipe={removeRecipe.bind(null, id, recipe.id)}
            isReadOnly={isReadOnly}
            hasTransitioned={hasTransitioned}
          />
        ))}

        {sections.map((section) => (
          <React.Fragment key={section.title}>
            <Label containerStyle={styles.sectionLabel} label={section.title} />
            {section.data.map((ingredient) => (
              <ListDetailIngredientRow
                key={ingredient.slug + ingredient.recipeId}
                name={ingredient.name}
                recipeName={ingredient.recipeName}
                quantity={ingredient.quantity}
                checked={ingredient.checked}
                onCheck={getCheckFunction(ingredient.recipeId, ingredient.slug)}
                isOver={isOver}
                isReadOnly={isReadOnly}
                deleteIngredient={() => removeIngredient(id, ingredient.slug)}
              />
            ))}
          </React.Fragment>
        ))}
        {!isOver && dualButton}
      </ScrollView>
    </>
  );
}
