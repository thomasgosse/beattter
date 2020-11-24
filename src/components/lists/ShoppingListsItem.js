import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, ThemeContext } from 'react-native-elements';

export default function ShoppingListsItem({ item, itemHeight, chevronIcon, onPress }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: {
      height: itemHeight,
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
    <ListItem key={item.name} containerStyle={styles.container} onPress={onPress}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {new Date(item.startingDay).toLocaleDateString()} - {new Date(item.endingDay).toLocaleDateString()}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron name={chevronIcon} type="ionicon" size={20} />
    </ListItem>
  );
}
