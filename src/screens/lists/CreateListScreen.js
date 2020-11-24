import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ThemeContext } from 'react-native-elements';

import Input from '../../components/utils/Input';
import Button from '../../components/utils/Button';
import Calendar from '../../components/utils/Calendar';
import useListsStore from '../../store/useListsStore';

function CreateListScreen({ navigation }) {
  const [placeholder, setPlaceholder] = useState('Liste de courses');
  const [startingDay, setStartingDay] = useState();
  const [endingDay, setEndingDay] = useState();
  const [name, setName] = useState('');
  const createList = useListsStore((state) => state.createList);

  useEffect(() => {
    function getDayMonthString(dateString) {
      if (!dateString) {
        return '';
      }
      return new Date(dateString).toLocaleDateString('default', { day: 'numeric', month: 'long' }).toLowerCase();
    }

    const from = getDayMonthString(startingDay);
    const to = getDayMonthString(endingDay);
    if (!from && !to) {
      setPlaceholder('Liste de courses');
    } else if (from === to) {
      setPlaceholder(`Liste du ${from}`);
    } else {
      setPlaceholder(`Liste du ${from} au ${to}`);
    }
  }, [startingDay, endingDay, setPlaceholder]);

  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
    calendarLabel: {
      marginLeft: 10,
      marginTop: 20,
      marginBottom: 5,
      fontSize: 16,
      color: colors.textBaseLight,
      fontWeight: '500',
    },
    input: { marginHorizontal: 10, marginVertical: 20 },
    buttonContainer: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
    },
  });

  async function onPress() {
    await createList(endingDay, startingDay, name || placeholder);
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.calendarLabel}>Période de la liste de courses</Text>
      <Calendar setStartingDay={setStartingDay} setEndingDay={setEndingDay} />
      <Input
        containerStyle={styles.input}
        label="Nom de la liste"
        placeholder={placeholder}
        value={name}
        setValue={setName}
      />
      <View style={styles.buttonContainer}>
        <Button text="Créer" disabled={!(startingDay && endingDay)} onPress={onPress} />
      </View>
    </ScrollView>
  );
}

export default CreateListScreen;
