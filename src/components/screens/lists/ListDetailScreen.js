import React from 'react';
import { Text } from 'react-native';

export default function ListDetail({ route }) {
  return <Text>{route.params?.title}</Text>;
}
