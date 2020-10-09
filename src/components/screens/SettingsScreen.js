import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useColors from '../themes/colors';

function SettingsScreen() {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text>links</Text>
    </View>
  );
}

export default SettingsScreen;
