import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
// import { TransitionPresets } from '@react-navigation/stack';

import * as RootNavigation from './RootNavigation';
import BottomTabNavigator from './BottomTabNavigator';
import CreateRecipeScreen from './screens/recipes/CreateRecipeScreen';
import CreateListScreen from './screens/lists/CreateListScreen';

import useTheme from './hooks/useTheme';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Recipes';

export default function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.title,
      }}
    >
      <Stack.Screen
        name={INITIAL_ROUTE_NAME}
        component={BottomTabNavigator}
        options={{
          headerRight: () => (
            <Icon.Button
              backgroundColor={colors.header}
              size={28}
              underlayColor={colors.header}
              name="add-outline"
              color={colors.textBase}
              onPress={() => {
                RootNavigation.getCurrentRoute() === 'Recipes'
                  ? RootNavigation.navigate('CreateRecipe')
                  : RootNavigation.navigate('CreateList');
              }}
            />
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name={'CreateRecipe'}
        component={CreateRecipeScreen}
        options={{
          title: 'Nouvelle recette',
        }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name={'CreateListFromRecipe'}
        component={CreateListScreen}
        options={{
          title: 'Nouvelle liste',
          ...TransitionPresets.ModalTransition,
        }}
      ></Stack.Screen> */}
      <Stack.Screen
        name={'CreateList'}
        component={CreateListScreen}
        options={{
          title: 'Nouvelle liste',
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
