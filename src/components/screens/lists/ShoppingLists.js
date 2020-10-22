import React, { useRef, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
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

  async function deleteRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
    await deleteList(rowKey);
  }

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.hiddenRow}>
      <TouchableOpacity style={styles.hiddenBtn} onPress={() => deleteRow(rowMap, data.item.key)}>
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
        keyExtractor={(item) => item.key}
        renderItem={(data) => (
          <ShoppingListItem
            item={data.item}
            navigate={RootNavigation.navigate}
            closeAll={() => swipeListRef.current.closeAllOpenRows()}
          />
        )}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-hiddenItemWidth}
        stopRightSwipe={-hiddenItemWidth * 1.5}
      />
    </SafeAreaView>
  );
}
