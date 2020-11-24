import React, { useContext, useRef, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext, ListItem } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

import ListDetailRecipeModalDelete from './ListDetailRecipeModalDelete';

export default function ListDetailRecipeRow({ name, nbPersons, index, removeRecipe }) {
  const rowRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hiddenItemWidth = 70;
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    image: {
      width: 55,
      height: '100%',
      borderRadius: 8,
      marginRight: 10,
    },
    recipe: {
      backgroundColor: colors.listRow,
      height: hiddenItemWidth,
      paddingVertical: 8,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    hiddenBtnIcon: {
      color: colors.header,
    },
    hiddenRow: {
      backgroundColor: colors.listRow,
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
    recipeName: {
      color: colors.textBase,
      fontWeight: '500',
    },
    nbPersons: {
      color: colors.textBase,
    },
    recipeItemContent: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });

  return (
    <>
      <SwipeRow
        ref={rowRef}
        friction={9}
        disableRightSwipe={true}
        rightOpenValue={-hiddenItemWidth}
        useNativeDriver={false}
      >
        <View style={styles.hiddenRow}>
          <TouchableOpacity style={styles.hiddenBtn} onPress={() => setModalVisible(true)}>
            <Icon style={styles.hiddenBtnIcon} name="trash" size={28} />
          </TouchableOpacity>
        </View>

        <ListItem containerStyle={styles.recipe} bottomDivider topDivider={index === 0}>
          <Image source={require('../../assets/empty-recipes.png')} style={styles.image} />
          <ListItem.Content style={styles.recipeItemContent}>
            <ListItem.Title style={styles.recipeName}>{name}</ListItem.Title>
            <ListItem.Title style={styles.nbPersons}>{` (${nbPersons} pers.)`}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </SwipeRow>

      <ListDetailRecipeModalDelete
        modalVisible={modalVisible}
        nbPersons={nbPersons}
        removeRecipe={removeRecipe}
        onClose={() => {
          setModalVisible(false);
          rowRef.current.manuallySwipeRow(0);
        }}
      />
    </>
  );
}