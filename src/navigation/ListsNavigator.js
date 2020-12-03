import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import SegmentedControl from '@react-native-community/segmented-control';

import ListsScreen from '../screens/lists/ListsScreen';

export default function ListsNavigator() {
  const {
    theme: { colors },
  } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    container: { flex: 1 },
    controlContainer: {
      paddingTop: 15,
      paddingBottom: 10,
      paddingHorizontal: 30,
      backgroundColor: colors.body,
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.controlContainer}>
        <SegmentedControl
          values={['En cours', 'Passées']}
          selectedIndex={selectedIndex}
          onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
        />
      </View>
      <ListsScreen type={selectedIndex === 0 ? 'ONGOING' : 'OVER'} />
    </View>
  );
}
