import React, { useContext } from 'react';
import shallow from 'zustand/shallow';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import RecipeListItem from '../../components/recipes/RecipeListItem';
import EmptyList from '../../components/utils/EmptyList';

import useRecipeStores from '../../store/useRecipesStore';

export default function RecipesScreen({ navigation }) {
  const { recipes, loading } = useRecipeStores(
    (state) => ({
      recipes: state.recipes,
      loading: state.loading,
    }),
    shallow
  );

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    list: {
      marginTop: 15,
      flex: 1,
    },
  });

  if (loading && recipes.length === 0) {
    return (
      <View style={styles.contentContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (recipes.length === 0) {
    return (
      <EmptyList
        text="Il semblerait que tu n'aies pas encore de recettes, créer la première !"
        btnText="Créer une recette"
        source={require('../../assets/empty-recipes.png')}
        onPress={() => navigation.navigate('CreateRecipe')}
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.body }}
      data={recipes}
      renderItem={({ item, index }) => (
        <RecipeListItem
          name={item.name}
          id={item.id}
          nbPersonsBase={item.nbPersonsBase}
          index={index}
          ingredients={item.ingredients}
          principalKind={item.principalKind}
        />
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}
