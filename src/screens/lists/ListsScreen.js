import React from 'react';
import shallow from 'zustand/shallow';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

import ShoppingList from '../../components/lists/ShoppingLists';
import * as RootNavigation from '../../navigation/RootNavigation';
import EmptyList from '../../components/utils/EmptyList';

import useListsStore from '../../store/useListsStore';

function ListsScreen({ type }) {
  const { lists, loading } = useListsStore(
    (state) => ({
      lists: type === 'ONGOING' ? state.onGoingLists : state.overLists,
      loading: state.loading,
    }),
    shallow
  );

  const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
      <EmptyList
        text={
          type === 'ONGOING'
            ? "Tu n'as pas de listes de courses en cours, crées-en une pour y ajouter tes recettes."
            : 'Tes listes dont la date est passée finiront ici ! Gardes les, elles nous servent à générer tes statisiques de consommation.'
        }
        btnText="Créer une liste"
        source={require('../../assets/empty-lists.png')}
        onPress={() => RootNavigation.navigate('CreateList')}
      />
    );
  }

  return <ShoppingList lists={lists} />;
}

export default ListsScreen;
