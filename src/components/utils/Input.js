import React, { useContext } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Label from './Label';

export default function Input({
  containerStyle,
  label,
  placeholder,
  value,
  setValue,
  keyboardType,
  returnKeyType,
  isReadOnly,
}) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
    input: {
      color: colors.textBase,
      fontSize: 18,
    },
    label: {
      marginBottom: 7,
    },
    divider: {
      marginTop: 5,
      borderBottomColor: isReadOnly ? colors.body : colors.inputDivider,
      borderBottomWidth: 1,
    },
  });

  return (
    <View style={containerStyle}>
      <Label label={label} containerStyle={styles.label} />
      <TextInput
        clearButtonMode={isReadOnly ? 'never' : 'always'}
        editable={!isReadOnly}
        placeholder={placeholder}
        placeholderTextColor={colors.textBaseLight}
        value={value}
        onChangeText={(text) => setValue && setValue(text)}
        style={styles.input}
        keyboardType={keyboardType || 'default'}
        returnKeyType={returnKeyType || 'default'}
      />
      <View style={styles.divider} />
    </View>
  );
}
