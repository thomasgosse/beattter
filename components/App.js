import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Navig from './Navig';

const App = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <Navig />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default App;
