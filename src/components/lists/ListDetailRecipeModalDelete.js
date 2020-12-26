import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';

import Button from '../utils/Button';
import BottomModal from '../utils/BottomModal';

import useListsStore from '../../store/useListsStore';

export default function ListDetailRecipeModalDelete({ modalVisible, nbPersons, removeRecipe, onClose }) {
  const [selectedValue, setSelectedValue] = useState(1);
  const [values, setValues] = useState([...Array(nbPersons).keys()].map((i) => (i + 1).toString()));

  const error = useListsStore((state) => state.error);

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    pickersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    picker: {
      flex: 1,
    },
    button: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      color: colors.textBase,
    },
    recipeName: {
      fontWeight: '500',
      ...this.text,
    },
    textError: {
      marginTop: 5,
      minHeight: 20,
      fontSize: 16,
      color: colors.danger,
    },
  });

  useEffect(() => {
    setValues([...Array(nbPersons).keys()].map((i) => (i + 1).toString()));
  }, [nbPersons]);

  async function onPress() {
    await removeRecipe(nbPersons === selectedValue, selectedValue);
    if (nbPersons !== selectedValue) {
      setTimeout(() => onClose(), 200);
    }
  }

  return (
    <BottomModal isVisible={modalVisible} onClose={onClose}>
      <Text style={styles.text}>
        Supprimer <Text style={styles.recipeName}>{selectedValue} personne(s)</Text> de la liste ?
      </Text>
      <View style={styles.pickersContainer}>
        <Picker style={styles.picker} selectedValue={selectedValue} onValueChange={setSelectedValue}>
          {values.map((item) => {
            return <Picker.Item label={item} key={item} value={Number(item)} />;
          })}
        </Picker>
      </View>
      <Button containerStyle={styles.button} text="Supprimer" onPress={onPress} />
      <Text style={styles.textError}>{error}</Text>
    </BottomModal>
  );
}
