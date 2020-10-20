import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeContext } from 'react-native-elements';

import ListsScreen from './ListsScreen';

const TopTab = createMaterialTopTabNavigator();

export default function ListsNavigator() {
  const {
    theme: { colors },
  } = useContext(ThemeContext);

  return (
    <TopTab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        tabStyle: {
          width: 100,
        },
        style: {
          colors: colors.textTitle,
          backgroundColor: colors.header,
        },
        indicatorStyle: {
          backgroundColor: colors.textTitleLighter,
        },
      }}
      initialRouteName="en cours"
    >
      <TopTab.Screen
        name="en cours"
        style={{ backgroundColor: colors.primary }}
        component={ListsScreen}
        initialParams={{ type: 'ONGOING' }}
      />
      <TopTab.Screen
        name="passées"
        style={{ backgroundColor: colors.primary }}
        component={ListsScreen}
        initialParams={{ type: 'OVER' }}
      />
    </TopTab.Navigator>
  );
}
