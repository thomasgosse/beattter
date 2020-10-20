import React, { useContext } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { ThemeContext } from 'react-native-elements';

export default function Input({ containerStyle, label, placeholder, value, setValue }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
    input: {
      fontSize: 18,
    },
    label: {
      marginBottom: 7,
      fontWeight: '500',
      fontSize: 16,
      color: colors.textBaseLight,
    },
    divider: {
      marginTop: 5,
      borderBottomColor: colors.divider,
      borderBottomWidth: 1,
    },
  });

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        clearButtonMode="always"
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue && setValue(text)}
        style={styles.input}
      />
      <View style={styles.divider} />
    </View>
  );
}
