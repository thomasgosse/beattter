import React, { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View, AppState, Appearance } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';

import { navigationRef } from './components/RootNavigation';
import RootNavigator from './components/RootNavigator';
import appTheme from './appTheme';

import useListsStore from './components/store/useListsStore';
import useRecipesStore from './components/store/useRecipesStore';

enableScreens();

const App = () => {
  const themeProvideRef = useRef(null);
  const getLists = useListsStore((state) => state.getLists);
  const getRecipes = useRecipesStore((state) => state.getRecipes);

  useEffect(() => {
    function handleAppStateChange(appState) {
      if (appState === 'active') {
        getLists();
        getRecipes();
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
  }, [getLists, getRecipes]);

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
        <StatusBar barStyle="default" translucent={true} />
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </ThemeProvider>
  );
};

export default App;
