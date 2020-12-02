import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import IngredientKindTooltip from './IngredientKindTooltip';

import * as RootNavigation from '../../navigation/RootNavigation';

import { isSeasonal } from '../../services/ingredient';

export default function RecipeListItem({ name, id, uri, nbPersonsBase, ingredients, principalKind, index }) {
  const [seasonal, setSeasonal] = useState(false);
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const cardWidth = Dimensions.get('window').width / 2 - 15 - 7.5;
  const styles = StyleSheet.create({
    container: {
      width: cardWidth,
      marginLeft: index % 2 === 0 ? 15 : 7.5,
      marginRight: index % 2 === 0 ? 7.5 : 15,
      marginBottom: 15,
    },
    card: {
      backgroundColor: colors.listRow,
      borderRadius: 8,
      padding: 4,
      paddingTop: 0,
    },
    image: {
      height: 130,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      width: cardWidth,
      alignSelf: 'center',
    },
    firstRow: {
      paddingLeft: 5,
      marginTop: 7,
      flexDirection: 'row',
      minHeight: 40,
    },
    secondRow: {
      minHeight: 35,
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 5,
    },
    name: {
      width: '75%',
      fontSize: 16,
      fontWeight: '600',
      color: colors.textBase,
      alignSelf: 'center',
    },
    icon: {
      flex: 1,
      alignItems: 'center',
    },
    nbIngredients: {
      fontSize: 14,
      width: '75%',
      fontWeight: '500',
      color: colors.textBaseLight,
    },
  });

  useEffect(() => {
    setSeasonal(isSeasonal(ingredients));
  }, [ingredients]);

  const source = uri ? { uri } : require('../../assets/chou.jpg');

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => RootNavigation.navigate('RecipeDetail', { title: name, id })}
      onLongPress={() =>
        RootNavigation.navigate('AddRecipeToList', {
          screen: 'Ajouter à une liste',
          params: {
            recipe: { id, name, nbPersonsBase, ingredients: JSON.parse(JSON.stringify(ingredients)), imageUri: uri },
          },
        })
      }
    >
      <View style={styles.card}>
        <Image source={source} style={styles.image} />
        <View>
          <View style={styles.firstRow}>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
            <View style={styles.icon}>
              <IngredientKindTooltip kind={principalKind} />
            </View>
          </View>
          <View style={styles.secondRow}>
            <Text style={styles.nbIngredients}>{`${ingredients.length} ingrédient${
              ingredients.length > 1 ? 's' : ''
            }`}</Text>
            {seasonal && (
              <View style={styles.icon}>
                <IngredientKindTooltip kind="seasonal" />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
