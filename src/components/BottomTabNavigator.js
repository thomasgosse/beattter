import React, { useEffect, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import RecipesScreen from './screens/recipes/RecipesScreen';
import ListsNavigator from './screens/lists/ListsNavigator';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  useEffect(() => {
    function getHeaderTitle() {
      const routeName = getFocusedRouteNameFromRoute(route);
      if (routeName === 'Lists') {
        return 'Listes de courses';
      } else {
        return 'Mes Recettes';
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
        style: { backgroundColor: colors.header },
        labelStyle: { color: colors.textTitle, marginTop: -5 },
      }}
    >
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
    </BottomTab.Navigator>
  );
}
