import React, { useContext, useRef } from 'react';
import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';

import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import IngredientKindTooltip from './IngredientKindTooltip';

import useRecipesStore from '../../store/useRecipesStore';

export default function Ingredient({ ingredient, index, itemHeight }) {
  const removeIngredient = useRecipesStore((state) => state.removeIngredient);

  const animatedHeight = useRef(new Animated.Value(1)).current;
  const hiddenItemWidth = 50;
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    hiddenContainer: {
      backgroundColor: colors.danger,
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
    hiddenBtnIcon: {
      color: colors.header,
    },
    listItem: {
      height: itemHeight,
      backgroundColor: colors.listRow,
    },
    listItemContent: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    ingredientName: {
      color: colors.textBase,
      fontWeight: '500',
    },
    quantity: {
      color: colors.textBaseLight,
      fontWeight: '500',
    },
  });

  const onSwipeValueChange = (swipeData) => {
    const { value } = swipeData;
    if (value < -Dimensions.get('window').width * 0.99 && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeIngredient(index);
        this.animationIsRunning = false;
      });
    }
  };

  return (
    <SwipeRow
      friction={9}
      disableRightSwipe={true}
      rightOpenValue={-Dimensions.get('window').width}
      onSwipeValueChange={onSwipeValueChange}
      useNativeDriver={false}
    >
      <View style={styles.hiddenContainer}>
        <View style={styles.hiddenBtn}>
          <Icon style={styles.hiddenBtnIcon} name="trash" size={28} />
        </View>
      </View>

      <Animated.View
        style={{
          height: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, itemHeight],
          }),
        }}
      >
        <ListItem containerStyle={styles.listItem} bottomDivider topDivider={index === 0}>
          <ListItem.Content style={styles.listItemContent}>
            <ListItem.Title style={styles.ingredientName}>{ingredient.name}</ListItem.Title>
            <ListItem.Title style={styles.quantity}> - {ingredient.quantity}</ListItem.Title>
          </ListItem.Content>
          <IngredientKindTooltip kind={ingredient.kind} />
        </ListItem>
      </Animated.View>
    </SwipeRow>
  );
}
