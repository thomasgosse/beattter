import * as React from 'react';
import { LogBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import useColors from './themes/colors';

const Stack = createStackNavigator();

import BottomTabNavigator from './BottomTabNavigator';
import SettingsScreen from './screens/SettingsScreen';

// LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const INITIAL_ROUTE_NAME = 'Home';

export default function Navigator() {
  const colors = useColors();

  return (
    <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Stack.Screen
        name={INITIAL_ROUTE_NAME}
        component={BottomTabNavigator}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTitleAlign: 'left',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name={'Settings'}
        component={SettingsScreen}
        options={{
          headerStyle: { backgroundColor: 'green' },
          headerTintColor: 'white',
          title: 'Default Header',
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
