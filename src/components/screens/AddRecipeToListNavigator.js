import React, { useContext } from 'react';
import { Button, Platform, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import AddRecipeToListScreen from './AddRecipeToListScreen';
import CreateListScreen from './lists/CreateListScreen';

const Stack = createStackNavigator();

export default function AddRecipeToListNavigator({ navigation }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Ajouter à une liste"
      screenOptions={{
        headerStyle: { backgroundColor: colors.header, elevation: 0, shadowOpacity: 0 },
      }}
    >
      <Stack.Screen
        name="Ajouter à une liste"
        component={AddRecipeToListScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
          headerLeftContainerStyle: { marginLeft: 5 },
          headerLeft: () =>
            Platform.OS === 'ios' ? (
              <Button title="Annuler" onPress={() => navigation.goBack()} />
            ) : (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="close" size={28} />
              </TouchableOpacity>
            ),
        }}
      />
      <Stack.Screen
        name="CreateList"
        component={CreateListScreen}
        options={{
          title: 'Nouvelle liste',
        }}
      />
    </Stack.Navigator>
  );
}
