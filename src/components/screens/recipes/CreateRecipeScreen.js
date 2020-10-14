import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

import useTheme from '../../hooks/useTheme';

export default function CreateRecipeScreen() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
    },
  });

  return (
    <ScrollView>
      <Text>Ajouter une recette</Text>
    </ScrollView>
  );
}
