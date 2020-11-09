import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Keyboard } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { ListItem, ThemeContext } from 'react-native-elements';
import slugify from 'slugify';

import Input from '../../utils/Input';
import Button from '../../utils/Button';
import IngredientKindTooltip from './IngredientKindTooltip';

import data from '../../../data';

export default function IngredientPickerScreen({ navigation, route }) {
  const [search, setSearch] = useState('');
  const [integer, setInteger] = useState(integers[0]);
  const [decimal, setDecimal] = useState(decimals[0]);
  const [unit, setUnit] = useState(units[0]);

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.body },
    list: { backgroundColor: colors.body },
    listItem: {
      height: 50,
    },
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

  const timer = useRef();
  useEffect(() => {
    function filterResult() {
      if (search.length > 2) {
        let filteredBySearch = data.filter((d) => {
          const slugSearch = slugify(search.toUpperCase());
          const slugData = d.name.toUpperCase();
          return slugify(slugData).indexOf(slugSearch) > -1;
        });
        setAutoCompleteResult(filteredBySearch);
      } else {
        setAutoCompleteResult([]);
      }
    }

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      filterResult();
    }, 200);
  }, [search]);

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
    <View style={styles.container}>
      <Input
        containerStyle={styles.input}
        label="Nom de l'ingrédient"
        placeholder={'Cherche dans la liste'}
        value={search}
        setValue={setSearch}
      />

      <FlatList
        data={autoCompleteResult}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={[
              styles.listItem,
              { backgroundColor: selectedIngredient.name === item.name ? colors.disabled : colors.body },
            ]}
            bottomDivider
            key={item.slug}
            onPress={() => {
              setSelectedIngredient(item);
              Keyboard.dismiss();
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.ingredientName} numberOfLines={1}>
                {item.name}
              </ListItem.Title>
            </ListItem.Content>
            <IngredientKindTooltip kind={item.kind} />
          </ListItem>
        )}
        keyExtractor={(item) => item.slug}
      />

      <View style={styles.pickersContainer}>
        {getPicker(integers, integer, setInteger)}
        <Text style={styles.dot}>.</Text>
        {getPicker(decimals, decimal, setDecimal)}
        {getPicker(units, unit, setUnit)}
      </View>

      <Button
        text="Ajouter"
        disabled={!selectedIngredient.name}
        containerStyle={styles.button}
        onPress={() => {
          const ingredient = { ...selectedIngredient, quantity: `${integer}.${decimal} ${unit}` };
          navigation.navigate(route.params?.initiatorRoute, { ingredient });
        }}
      />
    </View>
  );
}

const decimals = [...Array(100).keys()].map((i) => (i < 10 ? `0${i}` : i.toString()));
const units = ['kg', 'gr', 'l', 'cl', 'ml', 'pièce(s)', 'c.à café', 'c.à soupe'];
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
