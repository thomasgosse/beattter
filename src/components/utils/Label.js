import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';

export default function Label({ label, containerStyle }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    label: {
      fontWeight: '500',
      fontSize: 16,
      color: colors.textBaseLight,
      ...containerStyle,
    },
  });

  return <Text style={styles.label}>{label}</Text>;
}
