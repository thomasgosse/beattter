import React, { useEffect, useRef } from 'react';
import { Platform, StatusBar, StyleSheet, View, AppState, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';

import { navigationRef } from './components/RootNavigation';
import RootNavigator from './components/RootNavigator';
import appTheme from './appTheme';

import useStore from './components/store/useStore';

const App = () => {
  const themeProvideRef = useRef(null);
  const getLists = useStore((state) => state.getLists);

  useEffect(() => {
    function handleAppStateChange(appState) {
      if (appState === 'active') {
        getLists();
      }
    }

    function handleAppearanceChange({ colorScheme }) {
      themeProvideRef?.current?.replaceTheme(appTheme[colorScheme]);
    }

    AppState.addEventListener('change', handleAppStateChange);
    Appearance.addChangeListener(handleAppearanceChange);
    handleAppStateChange('active');
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
      Appearance.removeChangeListener(handleAppearanceChange);
    };
  }, [getLists]);

  const theme = Appearance.getColorScheme() === 'light' ? appTheme.light : appTheme.dark;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontFamily: 'Helvetica-neue',
    },
  });

  return (
    <ThemeProvider theme={theme} ref={themeProvideRef}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
};

export default App;
