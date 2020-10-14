import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import { navigationRef } from './RootNavigation';
import RootNavigator from './RootNavigator';

import useTheme from './hooks/useTheme';
import useUserStore from '../store/user-store';

enableScreens();

const App = () => {
  const { getUser } = useUserStore();
  const { colors } = useTheme();

  useEffect(() => {
    getUser('thomasgosse');
  }, [getUser]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.body,
      fontFamily: 'Helvetica-neue',
    },
  });

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
