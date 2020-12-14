import React, { useContext } from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import RNCheckBox from '@react-native-community/checkbox';

export default function CheckBox({ toggleCheckbox, onPress, isOver }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    checkbox: {
      width: 25,
      height: 25,
      marginLeft: 15,
    },
  });

  return toggleCheckbox ? (
    <RNCheckBox
      style={styles.checkbox}
      value={toggleCheckbox}
      disabled={isOver}
      tintColor={isOver ? colors.divider : colors.textTitle}
      onFillColor={isOver ? colors.divider : colors.textTitle}
      onTintColor={isOver ? colors.divider : colors.textTitle}
      onCheckColor={colors.header}
    />
  ) : (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <RNCheckBox
        style={styles.checkbox}
        value={toggleCheckbox}
        disabled={true}
        tintColor={isOver ? colors.divider : colors.textTitle}
        onFillColor={isOver ? colors.divider : colors.textTitle}
        onTintColor={isOver ? colors.divider : colors.textTitle}
        onCheckColor={colors.header}
      />
    </TouchableHighlight>
  );
}
