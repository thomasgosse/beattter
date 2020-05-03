import * as React from 'react';
import { YellowBox } from 'react-native';
import { createCollapsibleStack } from 'react-navigation-collapsible';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import TripScreen from './screens/TripScreen';

import useColors from './themes/colors';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);

const Stack = createStackNavigator();

export default function Navigator() {
  const colors = useColors();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerStyle: { backgroundColor: colors.primary },
          headerTitleAlign: 'left'
        }}
      />
      {createCollapsibleStack(
        <Stack.Screen
          name="Dummy"
          component={TripScreen}
          options={{
            headerStyle: { backgroundColor: 'green' },
            headerTintColor: 'white',
            title: 'Default Header'
          }}
        />
      )}
    </Stack.Navigator>
  );
}
