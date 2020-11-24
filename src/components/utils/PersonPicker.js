import React, { useContext } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import Label from './Label';
import Button from './Button';

export default function PersonPicker({ nbPersons, setNbPersons, label, isReadOnly }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: colors.listRow,
      alignItems: 'center',
      marginHorizontal: 10,
      borderRadius: 8,
      marginBottom: 20,
    },
    text: {
      marginHorizontal: 15,
      fontWeight: '500',
      fontSize: 16,
      color: colors.textBase,
    },
    button: {
      backgroundColor: colors.listRow,
      borderWidth: 0,
      width: 40,
      alignItems: 'center',
    },
    label: {
      marginBottom: 7,
      marginLeft: 10,
    },
  });

  function onPress(value) {
    setNbPersons(nbPersons + value > 1 ? nbPersons + value : 1);
  }

  return (
    <>
      <Label label={label || 'Nombre de personnes'} containerStyle={styles.label} />
      <View style={styles.container}>
        <Button disabled={isReadOnly} containerStyle={styles.button} onPress={() => onPress(-1)}>
          <Icon name="remove-circle-outline" size={30} color={isReadOnly ? colors.textBaseLight : colors.iconBtn} />
        </Button>
        <Text style={styles.text}>{nbPersons}</Text>
        <Button disabled={isReadOnly} containerStyle={styles.button} onPress={() => onPress(1)}>
          <Icon name="add-circle-outline" size={30} color={isReadOnly ? colors.textBaseLight : colors.iconBtn} />
        </Button>
      </View>
    </>
  );
}
