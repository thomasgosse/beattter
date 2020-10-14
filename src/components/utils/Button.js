import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import useTheme from '../hooks/useTheme';

export default function Button({ text, disabled, onPress }) {
  const { colors, variables } = useTheme();
  const styles = StyleSheet.create({
    button: {
      paddingTop: 12,
      paddingBottom: 12,
      backgroundColor: disabled ? colors.disabled : colors.textTitle,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: disabled ? colors.disabled : colors.textTitle,
      width: '80%',
    },
    buttonText: {
      color: colors.header,
      textAlign: 'center',
      fontWeight: '500',
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: variables.font.size,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} underlayColor={colors.body} disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
