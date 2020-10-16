import React, { useRef } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

import ShoppingListItem from './ShoppingListsItem';
import * as RootNavigation from '../../RootNavigation';

import useTheme from '../../hooks/useTheme';
import useStore from '../../store/useStore';

export default function ShoppingLists({ lists }) {
  const swipeListRef = useRef(null);
  const deleteList = useStore((state) => state.deleteList);
  const { colors, variables } = useTheme();

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
      width: variables.hiddenItemWidth,
      backgroundColor: colors.danger,
      right: 0,
    },
  });

  async function deleteRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    await deleteList(rowKey);
  }

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.hiddenRow}>
      <TouchableOpacity style={styles.hiddenBtn} onPress={() => deleteRow(rowMap, data.item.key)}>
        <Icon style={styles.hiddenBtnIcon} name="trash" size={28}></Icon>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SwipeListView
        ref={swipeListRef}
        data={lists}
        closeOnScroll={true}
        disableRightSwipe={true}
        keyExtractor={(item) => item.key}
        renderItem={(data) => (
          <ShoppingListItem
            item={data.item}
            navigate={RootNavigation.navigate}
            closeAll={() => swipeListRef.current.closeAllOpenRows()}
          />
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-variables.hiddenItemWidth}
        stopRightSwipe={-variables.hiddenItemWidth * 1.5}
      />
    </SafeAreaView>
  );
}
