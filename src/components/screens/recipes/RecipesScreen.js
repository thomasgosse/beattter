import React, { useContext } from 'react';
import shallow from 'zustand/shallow';
import { ScrollView, View, StyleSheet, Image, Text, ActivityIndicator, FlatList } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Button from '../../utils/Button';
import RecipeListItem from './RecipeListItem';

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
    container: {
      backgroundColor: colors.body,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      alignSelf: 'center',
      height: 300,
      resizeMode: 'contain',
    },
    text: {
      width: '80%',
      fontSize: 16,
      color: colors.textBase,
      textAlign: 'center',
      marginVertical: 20,
    },
    list: {
      marginTop: 10,
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
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <Image style={styles.image} source={require('../../../assets/empty-recipes.png')} />
        <Text style={styles.text}>Il semblerait que tu n'aies pas encore de recettes, créer la première !</Text>
        <Button text="Créer une recette" onPress={() => navigation.navigate('CreateRecipe')} />
      </ScrollView>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.body }}
      data={recipes}
      renderItem={({ item, index }) => <RecipeListItem name={item.name} index={index} />}
      keyExtractor={(item) => item.key}
      numColumns={2}
    />
  );
}
