import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import useColors from '../themes/colors';

function TripsListScreen({ navigation }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollView: {
      backgroundColor: colors.primary
    }
  });

  return <ScrollView style={styles.scrollView} />;
}

export default TripsListScreen;
