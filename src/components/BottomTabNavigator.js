import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import RecipesScreen from './screens/recipes/RecipesScreen';
import ListsNavigator from './screens/lists/ListsNavigator';

import useTheme from './hooks/useTheme';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  const { colors } = useTheme();

  function getHeaderTitle() {
    const routeName = route.state?.routes[route.state.index]?.name;
    if (routeName === 'Lists') {
      return 'Listes de courses';
    } else {
      return 'Mes Recettes';
    }
  }

  function getHeaderStyle() {
    const routeName = route.state?.routes[route.state.index]?.name;
    if (routeName === 'Lists') {
      return {
        backgroundColor: colors.header,
        shadowOpacity: 0,
        elevation: 0,
      };
    } else {
      return {
        backgroundColor: colors.header,
      };
    }
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(),
      headerStyle: getHeaderStyle(),
      headerTitleStyle: {
        color: colors.textTitle,
      },
    });
  }, [route]);

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
