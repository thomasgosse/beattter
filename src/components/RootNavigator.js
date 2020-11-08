import React, { useContext } from 'react';
import { TouchableOpacity, Button } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { ThemeContext } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import * as RootNavigation from './RootNavigation';
import BottomTabNavigator from './BottomTabNavigator';
import CreateRecipeScreen from './screens/recipes/CreateRecipeScreen';
import CreateListScreen from './screens/lists/CreateListScreen';
import ListDetailScreen from './screens/lists/ListDetailScreen';
import RecipeDetailScreen from './screens/recipes/RecipeDetailScreen';
import IngredientPickNavigator from './screens/recipes/IngredientPickNavigator';

const Stack = createNativeStackNavigator();
const INITIAL_ROUTE_NAME = 'Recipes';

export default function RootNavigator() {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  const renderHeaderRight = () => (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.getCurrentRoute() === 'Recipes'
          ? RootNavigation.navigate('CreateRecipe')
          : RootNavigation.navigate('CreateList');
      }}
    >
      <Icon
        backgroundColor={colors.header}
        size={26}
        underlayColor={colors.header}
        name="add-outline"
        color={colors.textBase}
      />
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: colors.title,
        headerHideShadow: true,
        stackPresentation: 'push',
      }}
    >
      <Stack.Screen
        name={INITIAL_ROUTE_NAME}
        component={BottomTabNavigator}
        options={{
          headerRight: renderHeaderRight,
        }}
      />
      <Stack.Screen
        name="CreateRecipe"
        component={CreateRecipeScreen}
        options={{
          title: 'Nouvelle recette',
        }}
      />
      <Stack.Screen
        name="CreateList"
        component={CreateListScreen}
        options={{
          title: 'Nouvelle liste',
        }}
      />
      <Stack.Screen
        name="ListDetail"
        component={ListDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={({ route, navigation }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name={'IngredientPick'}
        component={IngredientPickNavigator}
        options={{
          headerShown: false,
          stackPresentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
