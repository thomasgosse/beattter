import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import RecipesScreen from '../screens/recipes/RecipesScreen';
import ListsNavigator from './ListsNavigator';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  useEffect(() => {
    function getHeaderTitle() {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === 'Recipes') {
        return 'Mes Recettes';
      } else {
        return 'Listes de courses';
      }
    }

    navigation.setOptions({
      headerTitle: getHeaderTitle(),
      headerStyle: {
        backgroundColor: colors.header,
      },
      headerTitleStyle: {
        color: colors.textTitle,
      },
    });
  }, [navigation, route, colors.textTitle, colors.header]);

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: colors.header,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
        },
        labelStyle: { color: colors.textTitle, marginTop: -5 },
      }}
    >
      <BottomTab.Screen
        name="Lists"
        component={ListsNavigator}
        options={{
          title: 'Listes',
          tabBarIcon: ({ focused }) => (
            <Icon size={28} name="cart-outline" color={focused ? colors.textTitle : colors.textBaseLight} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          title: 'Recettes',
          tabBarIcon: ({ focused }) => (
            <Icon size={28} name="book-outline" color={focused ? colors.textTitle : colors.textBaseLight} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
