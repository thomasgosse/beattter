import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import CheckBox from '../utils/CheckBox';

export default function ListDetailIngredientRow({
  name,
  recipeName,
  quantity,
  checked,
  onCheck,
  isOver,
  isReadOnly,
  deleteIngredient,
  index,
}) {
  const [toggleCheckbox, setToggleCheckbox] = useState(checked);

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    ingredient: {
      borderRadius: 8,
      marginHorizontal: 10,
      backgroundColor: colors.listRow,
      height: 60,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: index === 0 ? 0 : 10,
    },
    ingredientName: {
      textDecorationLine: toggleCheckbox ? 'line-through' : 'none',
      fontWeight: '500',
      color: colors.textBase,
      fontSize: 16,
    },
    controls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      width: 25,
      height: 25,
      marginLeft: 15,
    },
    content: {
      flexDirection: 'column',
    },
    firstColumn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantity: {
      fontSize: 16,
      color: colors.textBase,
    },
    secondColumn: {
      color: colors.textBaseLight,
    },
  });

  const onPress = async () => {
    if (isOver) {
      return;
    }
    const result = await onCheck(!toggleCheckbox);
    result && setToggleCheckbox(!toggleCheckbox);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.ingredient}>
        <View style={styles.content}>
          <View style={styles.firstColumn}>
            <Text style={styles.ingredientName}>{name}</Text>
            <Text style={styles.quantity}>
              {' '}
              - {parseFloat(quantity.value)}
              {quantity.unit}
            </Text>
          </View>
          {recipeName !== '' && (
            <Text style={styles.secondColumn} numberOfLines={1}>
              {recipeName}
            </Text>
          )}
        </View>
        <View style={styles.controls}>
          {!isReadOnly && recipeName === '' && (
            <TouchableOpacity onPress={deleteIngredient}>
              <Icon name="trash" size={28} color={colors.danger} />
            </TouchableOpacity>
          )}

          <CheckBox toggleCheckbox={toggleCheckbox} onPress={onPress} isOver={isOver} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
