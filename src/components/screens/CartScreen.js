import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import useColors from '../themes/colors';

function CartScreen({ navigation }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Text>links</Text>
    </View>
  );
}

export default CartScreen;
