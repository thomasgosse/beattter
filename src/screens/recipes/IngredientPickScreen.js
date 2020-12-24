import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { ListItem, ThemeContext } from 'react-native-elements';
import slugify from 'slugify';

import Input from '../../components/utils/Input';
import Button from '../../components/utils/Button';
import IngredientKindTooltip from '../../components/recipes/IngredientKindTooltip';

import useIngredientsStore from '../../store/useIngredientsStore';

const units = ['kg', 'gr', 'l', 'cl', 'ml', 'pièce(s)', 'c.à café', 'c.à soupe'];

export default function IngredientPickerScreen({ navigation, route }) {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState(units[0]);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const ingredients = useIngredientsStore((state) => state.ingredients);

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
    picker: { flex: 1 },
    button: {
      alignSelf: 'center',
      marginVertical: 30,
    },
    inputQuantity: {
      marginHorizontal: 10,
      marginVertical: 20,
      width: '50%',
    },
  });

  const timer = useRef();
  useEffect(() => {
    function filterResult() {
      if (search.length > 2) {
        let filteredBySearch = ingredients.filter((d) => {
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
  }, [search, ingredients]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={100}>
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
        keyExtractor={(item) => item.slug + item.kind}
      />

      <View style={styles.pickersContainer}>
        <Input
          containerStyle={styles.inputQuantity}
          label="Quantité"
          placeholder="0"
          keyboardType="decimal-pad"
          returnKeyType="done"
          value={value}
          setValue={setValue}
        />
        <Picker mode="dialog" style={styles.picker} selectedValue={unit} onValueChange={setUnit}>
          {units.map((item) => {
            return <Picker.Item label={item} key={item} value={item} />;
          })}
        </Picker>
      </View>

      <Button
        text="Ajouter"
        disabled={!selectedIngredient.name}
        containerStyle={styles.button}
        onPress={() => {
          const ingredient = { ...selectedIngredient, quantity: { value: parseFloat(value), unit } };
          navigation.navigate(route.params?.initiatorRoute, { ingredient });
        }}
      />
    </KeyboardAvoidingView>
  );
}
