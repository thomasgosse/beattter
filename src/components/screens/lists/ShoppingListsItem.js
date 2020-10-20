import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';

export default function ShoppingListsItem({ item, navigate, closeAll }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      height: 80,
    },
    title: {
      marginBottom: 7,
      color: colors.textBase,
      fontWeight: '500',
    },
    subtitle: {
      color: colors.textBaseLight,
      fontWeight: '400',
    },
  });

  return (
    <ListItem
      key={item.name}
      containerStyle={styles.container}
      onPress={() => {
        navigate('ListDetail', { title: item.name });
        closeAll();
      }}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {new Date(item.startingDay).toLocaleDateString()} - {new Date(item.endingDay).toLocaleDateString()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron name="chevron-forward" type="ionicon" size={18} />
    </ListItem>
  );
}
