import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import useColors from './themes/colors';
import Navigator from './Navigator';

import useUserStore from '../store/user-store';

const App = () => {
  const { getUser } = useUserStore();
  const colors = useColors();

  useEffect(() => {
    getUser('thomasgosse');
  }, [getUser]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      fontFamily: 'Helvetica-neue'
    }
  });

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
