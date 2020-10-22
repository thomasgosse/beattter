import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { ThemeContext } from 'react-native-elements';

import Input from '../../utils/Input';
import Button from '../../utils/Button';

import useRecipesStore from '../../store/useRecipesStore';

const decimals = [...Array(100).keys()].map((i) => (i < 10 ? `0${i}` : i.toString()));
const units = ['kg', 'gr'];
const integers = [...Array(1001).keys()]
  .filter((i) => {
    if (i <= 50) {
      return true;
    } else if (i < 200 && i % 5 === 0) {
      return true;
    } else if (i <= 1000 && i % 20 === 0) {
      return true;
    } else {
      return false;
    }
  })
  .map((i) => i.toString());

export default function IngredientPickerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [integer, setInteger] = useState(integers[0]);
  const [decimal, setDecimal] = useState(decimals[0]);
  const [unit, setUnit] = useState(units[0]);
  const addIngredient = useRecipesStore((state) => state.addIngredient);

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    contentContainer: { flex: 1 },
    container: { backgroundColor: colors.body },
    input: {
      marginHorizontal: 10,
      marginVertical: 20,
    },
    pickersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dot: { fontSize: 30 },
    picker: { flex: 1 },
    button: {
      alignSelf: 'center',
      marginVertical: 30,
    },
  });

  function getPicker(list, selectedValue, onValueChange) {
    return (
      <Picker mode="dialog" style={styles.picker} selectedValue={selectedValue} onValueChange={onValueChange}>
        {list.map((item) => {
          return <Picker.Item label={item} key={item} value={item} />;
        })}
      </Picker>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <Input
        containerStyle={styles.input}
        label="Nom de l'ingrédient"
        placeholder={'Cherche dans la liste'}
        value={name}
        setValue={setName}
      />

      <View style={styles.pickersContainer}>
        {getPicker(integers, integer, setInteger)}
        <Text style={styles.dot}>.</Text>
        {getPicker(decimals, decimal, setDecimal)}
        {getPicker(units, unit, setUnit)}
      </View>

      <Button
        text="Créer"
        disabled={!name}
        containerStyle={styles.button}
        onPress={() => {
          addIngredient({ name, quantity: `${integer}.${decimal} ${unit}` });
          navigation.goBack();
        }}
      />
    </ScrollView>
  );
}
