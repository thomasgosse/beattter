import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import TripsListScreen from './screens/TripsListScreen';
import ProfileScreen from './screens/ProfileScreen';
import useColors from './themes/colors';

import useUserStore from '../store/user-store';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Trips';

export default function BottomTabNavigator({ navigation, route }) {
  const colors = useColors();
  const { user } = useUserStore();

  function getHeaderTitle() {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
      case 'Trips':
        return 'Mes Voyages';
      case 'Profile':
        return (user && user.name) || 'Profil';
    }
  }

  function getHeaderStyle() {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    if (routeName === 'Trips') {
      return {
        backgroundColor: colors.primary,
        shadowOpacity: 0,
        elevation: 0
      };
    } else {
      return {
        backgroundColor: colors.primary
      };
    }
  }

  navigation.setOptions({
    headerStyle: getHeaderStyle(),
    headerTitle: getHeaderTitle(),
    headerTitleStyle: {
      color: colors.textTitle,
      fontWeight: 'bold',
      fontSize: 28,
      backgroundColor: colors.primary
    }
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: { backgroundColor: colors.primary },
        showLabel: false
      }}
    >
      <BottomTab.Screen
        name="Trips"
        component={TripsListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon size={26} name="map" color={focused ? colors.textTitle : colors.textBaseLight} />
          )
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon size={26} name="user" color={focused ? colors.textTitle : colors.textBaseLight} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
