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
      justifyContent: isReadOnly ? 'flex-start' : 'center',
      flexDirection: 'row',
      backgroundColor: colors.listRow,
      alignItems: 'center',
      marginHorizontal: 10,
      borderRadius: 8,
      marginBottom: 20,
      minHeight: 60,
    },
    text: {
      marginHorizontal: 15,
      fontWeight: '500',
      fontSize: 18,
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

  if (isReadOnly) {
    return (
      <>
        <Label label={label || 'Nombre de personnes'} containerStyle={styles.label} />
        <View style={styles.container}>
          <Text style={styles.text}>{nbPersons}</Text>
          <Icon name="man" size={24} color={colors.iconBtn} />
        </View>
      </>
    );
  }

  return (
    <>
      <Label label={label || 'Nombre de personnes'} containerStyle={styles.label} />
      <View style={styles.container}>
        <Button containerStyle={styles.button} onPress={() => onPress(-1)}>
          <Icon name="remove-circle-outline" size={30} color={colors.iconBtn} />
        </Button>
        <Text style={styles.text}>{nbPersons}</Text>
        <Button containerStyle={styles.button} onPress={() => onPress(1)}>
          <Icon name="add-circle-outline" size={30} color={colors.iconBtn} />
        </Button>
      </View>
    </>
  );
}
