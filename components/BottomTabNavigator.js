import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Button } from 'react-native';
import { Icon } from 'react-native-elements';

import HomeScreen from './screens/HomeScreen';
import LinksScreen from './screens/LinksScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation }) {
  navigation.setOptions({
    headerTitle: 'Yoman',
    headerRight: () => <Button onPress={() => alert('This is a button!')} title="Info" color="blue" />
  });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Mes voyages',
          tabBarIcon: ({ focused }) => <Icon name="ios-map" type="ionicon" color={focused ? 'blue' : '#f50'} />
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Rechercher',
          tabBarIcon: ({ focused }) => <Icon name="ios-search" type="ionicon" color={focused ? 'blue' : '#f50'} />
        }}
      />
    </BottomTab.Navigator>
  );
}
