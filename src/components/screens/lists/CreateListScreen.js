import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Input from '../../utils/Input';
import Button from '../../utils/Button';
import Calendar from '../../utils/Calendar';

import useTheme from '../../hooks/useTheme';

function CreateListScreen({ navigation }) {
  const [placeholder, setPlaceholder] = useState('Liste du _ au _');
  const [startingDay, setStartingDay] = useState();
  const [endingDay, setEndingDay] = useState();

  useEffect(() => {
    const from = startingDay ? new Date(startingDay).toLocaleDateString() : '_';
    const to = endingDay ? new Date(endingDay).toLocaleDateString() : '_';
    setPlaceholder(`Liste du ${from} au ${to}`);
  }, [startingDay, endingDay, setPlaceholder]);

  const { colors, variables } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
    calendarLabel: {
      marginLeft: 10,
      marginTop: 20,
      marginBottom: 5,
      fontSize: variables.font.size,
      color: colors.textBaseLight,
      fontWeight: '500',
    },
    input: { marginHorizontal: 10, marginVertical: 20 },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.calendarLabel}>Période de la liste de courses</Text>
      <Calendar setStartingDay={setStartingDay} setEndingDay={setEndingDay} />
      <Input containerStyle={styles.input} label="Nom de la liste" placeholder={placeholder} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Button
          text="Créer"
          disabled={!(startingDay && endingDay)}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

export default CreateListScreen;
