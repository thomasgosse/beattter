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
    text: {
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 5,
      fontSize: 16,
      color: colors.textBaseLight,
      fontWeight: '500',
    },
    label: {
      marginBottom: 7,
      fontWeight: '500',
      fontSize: 16,
      color: colors.textBaseLight,
    },
  });

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        clearButtonMode="always"
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        style={{
          fontSize: 18,
        }}
      />
      <View
        style={{
          marginTop: 5,
          borderBottomColor: colors.divider,
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
}
