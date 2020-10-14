import React from 'react';
import { ScrollView, StyleSheet, Image, Text, View, SafeAreaView, SectionList } from 'react-native';
import { ListItem } from 'react-native-elements';

import Button from '../../utils/Button';
import ShoppingListItem from './ShoppingListItem';

import useTheme from '../../hooks/useTheme';

let lists = [
  {
    title: 'en cours',
    data: [
      { name: 'Ma liste 1', startingDay: '2020-12-01', endingDay: '2020-12-12' },
      { name: 'Ma liste 2', startingDay: '2020-12-01', endingDay: '2020-12-12' },

      { name: 'Ma liste 3', startingDay: '2020-12-01', endingDay: '2020-12-12' },
      { name: 'Ma liste 5', startingDay: '2020-12-01', endingDay: '2020-12-12' },
    ],
  },
  {
    title: 'passées',
    data: [
      { name: 'Ma liste 12', startingDay: '2020-02-01', endingDay: '2020-02-12' },
      { name: 'Ma liste 13', startingDay: '2020-02-01', endingDay: '2020-02-12' },
      { name: 'Ma liste 14', startingDay: '2020-02-01', endingDay: '2020-02-12' },
      { name: 'Ma liste 15', startingDay: '2020-02-01', endingDay: '2020-02-12' },
    ],
  },
];

function ListsScreen({ navigation }) {
  const { colors, variables } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.body,
    },
    contentContainerEmpty: {
      flex: 1,
      backgroundColor: colors.body,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      alignSelf: 'center',
      height: 300,
      resizeMode: 'contain',
    },
    text: {
      width: '80%',
      fontSize: variables.font.size,
      color: colors.textBase,
      textAlign: 'center',
      marginVertical: 20,
    },
  });

  if (lists.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.contentContainerEmpty} style={styles.container}>
        <View>
          <Image style={styles.image} source={require('../../../assets/empty-lists.png')} />
          <Text style={styles.text}>
            Il semblerait que tu n'aies pas encore de liste de courses ! Crées-en une pour y ajouter les ingrédients de
            tes recettes.
          </Text>
          <Button text="Créer une liste" onPress={() => navigation.navigate('CreateList')} />
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={lists}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item l={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontSize: 32, color: colors.textTitle, backgroundColor: colors.header }}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

function Item({ l }) {
  return (
    <ListItem key={l.name} bottomDivider style={{}}>
      <ListItem.Content>
        <ListItem.Title>{l.name}</ListItem.Title>
        <ListItem.Subtitle>
          {l.startingDay}-{l.endingDay}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default ListsScreen;
