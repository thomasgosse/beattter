import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';

export default function ListDetailIngredientRow({ name, recipeName, quantity, checked, onCheck, isReadOnly, index }) {
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
    checkbox: {
      width: 25,
      height: 25,
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

  return (
    <View style={styles.ingredient}>
      <View style={styles.content}>
        <View style={styles.firstColumn}>
          <Text style={styles.ingredientName}>{name}</Text>
          <Text style={styles.quantity}>
            {' '}
            - {quantity.value}
            {quantity.unit}
          </Text>
        </View>
        <Text style={styles.secondColumn} numberOfLines={1}>
          {recipeName}
        </Text>
      </View>
      <CheckBox
        style={styles.checkbox}
        onAnimationType="bounce"
        offAnimationType="bounce"
        disabled={isReadOnly}
        onValueChange={async (value) => {
          setToggleCheckbox(value);
          await onCheck(value);
        }}
        value={checked}
        animationDuration={0.3}
        tintColor={isReadOnly ? colors.divider : colors.textTitle}
        onFillColor={isReadOnly ? colors.divider : colors.textTitle}
        onTintColor={isReadOnly ? colors.divider : colors.textTitle}
        onCheckColor={colors.header}
      />
    </View>
  );
}
