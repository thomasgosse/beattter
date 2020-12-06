import React, { useContext } from 'react';
import { Button, Platform, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import IngredientPickerScreen from '../screens/recipes/IngredientPickScreen';

const Stack = createStackNavigator();

export default function IngredientPickNavigator({ navigation }) {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Ajouter un ingrédient"
      screenOptions={{
        ...(Platform.OS === 'ios' && { headerStatusBarHeight: 0 }),
        headerStyle: { backgroundColor: colors.header, elevation: 0, shadowOpacity: 0 },
      }}
    >
      <Stack.Screen
        name="Ajouter un ingrédient"
        component={IngredientPickerScreen}
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
    </Stack.Navigator>
  );
}
