import React, { useRef, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from 'react-native-elements';

import ShoppingListItem from './ShoppingListsItem';
import * as RootNavigation from '../../RootNavigation';

import useListsStore from '../../store/useListsStore';

export default function ShoppingLists({ lists }) {
  const swipeListRef = useRef(null);
  const deleteList = useListsStore((state) => state.deleteList);
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const hiddenItemWidth = 80;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.body,
      flex: 1,
    },
    hiddenBtnIcon: {
      color: colors.header,
    },
    hiddenRow: {
      backgroundColor: colors.body,
      flex: 1,
    },
    hiddenBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: hiddenItemWidth,
      backgroundColor: colors.danger,
      right: 0,
    },
  });

  async function deleteRow(rowMap, listId) {
    if (rowMap[listId]) {
      rowMap[listId].closeRow();
    }
    await deleteList(listId);
  }

  function onPressDelete(rowMap, listId) {
    Alert.alert(
      'Souhaitez vous vraiment supprimer cette list ?',
      'Elles sont utiles pour générer ta synthèse',
      [
        {
          text: 'Annuler',
          onPress: () => swipeListRef.current.closeAllOpenRows(),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteRow(rowMap, listId),
        },
      ],
      { cancelable: false }
    );
  }

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.hiddenRow}>
      <TouchableOpacity style={styles.hiddenBtn} onPress={() => onPressDelete(rowMap, data.item.id)}>
        <Icon style={styles.hiddenBtnIcon} name="trash" size={28} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        ref={swipeListRef}
        data={lists}
        friction={9}
        closeOnScroll={true}
        disableRightSwipe={true}
        keyExtractor={(item) => item.id}
        renderItem={(data) => (
          <ShoppingListItem
            item={data.item}
            itemHeight={hiddenItemWidth}
            chevronIcon="chevron-forward"
            onPress={() => {
              RootNavigation.navigate('ListDetail', { title: data.item.name, id: data.item.id });
              swipeListRef.current.closeAllOpenRows();
            }}
          />
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-hiddenItemWidth}
        stopRightSwipe={-hiddenItemWidth * 1.5}
      />
    </SafeAreaView>
  );
}
