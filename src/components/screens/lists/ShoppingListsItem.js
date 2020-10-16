import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import useTheme from '../../hooks/useTheme';

export default function ShoppingListsItem({ item, navigate, closeAll }) {
  const { colors, variables } = useTheme();
  const styles = StyleSheet.create({
    container: {
      height: variables.listItemHeight,
    },
    title: {
      marginBottom: 7,
      color: colors.textBase,
      fontWeight: '500',
    },
    subtitle: {
      color: colors.textBaseLight,
      fontWeight: variables.font.normal,
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
