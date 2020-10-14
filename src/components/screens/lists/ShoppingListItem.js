import React from 'react';
import { View, Text } from 'react-native';

export default function ShoppingListItem({ list }) {
  return (
    <View>
      <Text>{list.name}</Text>
    </View>
  );
}
