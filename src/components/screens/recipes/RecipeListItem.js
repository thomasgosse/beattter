import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import IngredientKindTooltip from './IngredientKindTooltip';

import * as RootNavigation from '../../RootNavigation';

import { isSeasonal } from '../../../services/ingredient';

export default function RecipeListItem({ name, id, ingredients, principalKind, index }) {
  const [seasonal, setSeasonal] = useState(false);
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const cardWidth = Dimensions.get('window').width / 2;
  const styles = StyleSheet.create({
    container: {
      width: cardWidth,
      paddingLeft: index % 2 === 0 ? 10 : 5,
      paddingRight: index % 2 === 0 ? 5 : 10,
      marginBottom: 20,
    },
    card: {
      backgroundColor: colors.listRow,
      borderRadius: 8,
      padding: 7,
    },
    image: {
      height: 120,
      borderRadius: 8,
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

  let image = {
    uri: 'https://www.topuniversities.com/sites/default/files/articles/lead-images/study_in_bangkok.jpg',
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => RootNavigation.navigate('RecipeDetail', { title: name, id })}
      onLongPress={() => RootNavigation.navigate('AddRecipeToList')}
    >
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
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
