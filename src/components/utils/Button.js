import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';

export default function Button({ text, children, disabled, onPress, containerStyle }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    button: {
      paddingTop: 12,
      paddingBottom: 12,
      backgroundColor: disabled ? colors.disabled : colors.button,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: disabled ? colors.disabled : colors.button,
      width: '80%',
      ...containerStyle,
    },
    buttonText: {
      color: colors.body,
      textAlign: 'center',
      fontWeight: '500',
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} underlayColor={colors.body} disabled={disabled}>
      {children ? children : <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
}
