import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './RootNavigation';
import RootNavigator from './RootNavigator';

import useTheme from './hooks/useTheme';
import useStore from './store/useStore';

const App = () => {
  const getLists = useStore((state) => state.getLists);
  const { colors } = useTheme();

  function handleAppStateChange(appState) {
    console.log('Handling app state', appState);
    if (appState === 'active') {
      getLists();
    }
  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    handleAppStateChange('active');
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

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
