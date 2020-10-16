import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ListsScreen from './ListsScreen';

import useTheme from '../../hooks/useTheme';

const TopTab = createMaterialTopTabNavigator();

export default function ListsNavigator() {
  const { colors } = useTheme();

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
