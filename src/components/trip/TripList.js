import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import useColors from '../themes/colors';
import TripListItem from './TripListItem';

function TripList({ trips }) {
  const colors = useColors();
  const styles = StyleSheet.create({
    contentContainer: {
      backgroundColor: colors.primary,
      flex: 1,
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 5
    },
    container: {
      backgroundColor: colors.primary
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      {trips.map((trip, i) => (
        <TripListItem key={i} />
      ))}
    </ScrollView>
  );
}

export default TripList;
