import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext, ListItem } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

import ListDetailRecipeModalDelete from './ListDetailRecipeModalDelete';

export default function ListDetailRecipeRow({
  name,
  nbPersons,
  uri,
  setIsSwiping,
  index,
  removeRecipe,
  isReadOnly,
  hasTransitioned,
}) {
  const rowRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [source, setSource] = useState(uri ? { uri } : require('../../assets/empty-recipes.png'));

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

  useEffect(() => {
    let current = rowRef.current;
    let timeout;
    if (!isReadOnly && index === 0 && !hasTransitioned.current) {
      hasTransitioned.current = true;
      rowRef.current.manuallySwipeRow(-hiddenItemWidth);
      timeout = setTimeout(() => {
        rowRef.current.manuallySwipeRow(0);
      }, 1000);
    }
    return () => {
      current.manuallySwipeRow(0);
      clearTimeout(timeout);
    };
  }, [isReadOnly, hasTransitioned, index]);

  return (
    <>
      <SwipeRow
        ref={rowRef}
        friction={9}
        disableRightSwipe={true}
        disableLeftSwipe={isReadOnly}
        rightOpenValue={-hiddenItemWidth}
        useNativeDriver={false}
        swipeGestureBegan={() => setIsSwiping(true)}
        swipeGestureEnded={() => setIsSwiping(false)}
      >
        <View style={styles.hiddenRow}>
          <TouchableOpacity style={styles.hiddenBtn} onPress={() => setModalVisible(true)}>
            <Icon style={styles.hiddenBtnIcon} name="trash" size={28} />
          </TouchableOpacity>
        </View>

        <ListItem containerStyle={styles.recipe} bottomDivider topDivider={index === 0}>
          <Image
            source={source}
            style={styles.image}
            onError={() => setSource(require('../../assets/empty-recipes.png'))}
          />
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
