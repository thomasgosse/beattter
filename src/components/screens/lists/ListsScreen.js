import React, { useContext } from 'react';
import shallow from 'zustand/shallow';
import { ScrollView, StyleSheet, Image, Text, ActivityIndicator, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Button from '../../utils/Button';
import ShoppingList from './ShoppingLists';
import * as RootNavigation from '../../RootNavigation';

import useStore from '../../store/useStore';

function ListsScreen({ route }) {
  const type = route?.params?.type;
  const { lists, loading } = useStore(
    (state) => ({
      lists: type === 'ONGOING' ? state.onGoingLists : state.overLists,
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
      backgroundColor: colors.body,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: colors.body,
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

  if (loading && lists.length === 0) {
    return (
      <View style={styles.contentContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (lists.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
        <Image style={styles.image} source={require('../../../assets/empty-lists.png')} />
        <Text style={styles.text}>
          {type === 'ONGOING'
            ? "Tu n'as pas de listes de courses en cours, crées-en une pour y ajouter les ingrédients de te recettes."
            : 'Tes listes dont la date est passée finiront ici ! Gardes les, elles nous servent à générer tes statisiques de consommation.'}
        </Text>
        <Button text="Créer une liste" onPress={() => RootNavigation.navigate('CreateList')} />
      </ScrollView>
    );
  }

  return <ShoppingList lists={lists} />;
}

export default ListsScreen;
