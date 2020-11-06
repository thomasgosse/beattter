import React, { useContext } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Label from './Label';

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
    },
    divider: {
      marginTop: 5,
      borderBottomColor: colors.divider,
      borderBottomWidth: 1,
    },
  });

  return (
    <View style={containerStyle}>
      <Label label={label} containerStyle={styles.label} />
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
