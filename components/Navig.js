import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createCollapsibleStack } from 'react-navigation-collapsible';
import BottomTabNavigator from './BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import DummyScreen from './screens/DummyScreen';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state']);
const Stack = createStackNavigator();
console.log('hey');

export default function Navig() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        {createCollapsibleStack(
          <Stack.Screen
            name="Dummy"
            component={DummyScreen}
            options={{
              headerStyle: { backgroundColor: 'green' },
              headerTintColor: 'white',
              title: 'Default Header'
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
