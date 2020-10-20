import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Image, Text } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Button from '../../utils/Button';

function RecipesScreen({ navigation }) {
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
  });

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Image style={styles.image} source={require('../../../assets/empty-recipes.png')} />
      <Text style={styles.text}>Il semblerait que tu n'aies pas encore de recettes, créer la première !</Text>
      <Button text="Créer une recette" onPress={() => navigation.navigate('CreateRecipe')} />
    </ScrollView>
  );
}

export default RecipesScreen;
