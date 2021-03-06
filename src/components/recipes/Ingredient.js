import React, { useContext, useRef, useEffect } from 'react';
import { StyleSheet, Animated, View, Dimensions, Text } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

import IngredientKindTooltip from './IngredientKindTooltip';
import { isIngredientSeasonal } from '../../services/ingredient';

export default function Ingredient({
  ingredient,
  index,
  itemHeight,
  removeIngredient,
  isReadOnly,
  hasTransitioned,
  setIsSwiping,
}) {
  const rowRef = useRef(null);
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
    listItemKinds: { flexDirection: 'row' },
    kindTooltip: { marginLeft: 5 },
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
    <SwipeRow
      ref={rowRef}
      friction={9}
      disableRightSwipe={true}
      disableLeftSwipe={isReadOnly}
      initialLeftActionState={true}
      swipeToOpenPercent={30}
      rightOpenValue={-Dimensions.get('window').width}
      onSwipeValueChange={onSwipeValueChange}
      useNativeDriver={false}
      swipeGestureBegan={() => setIsSwiping(true)}
      swipeGestureEnded={() => setIsSwiping(false)}
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
            <ListItem.Title style={styles.ingredientName} numberOfLines={1}>
              {ingredient.name}
              <Text style={styles.quantity} numberOfLines={1}>
                {' '}
                - {parseFloat(ingredient.quantity.value)}
                {ingredient.quantity.unit}
              </Text>
            </ListItem.Title>
          </ListItem.Content>
          <View style={styles.listItemKinds}>
            {!isIngredientSeasonal(ingredient.months) && <IngredientKindTooltip kind="not-seasonal" />}
            <IngredientKindTooltip kind={ingredient.kind} containerStyle={styles.kindTooltip} />
          </View>
        </ListItem>
      </Animated.View>
    </SwipeRow>
  );
}
