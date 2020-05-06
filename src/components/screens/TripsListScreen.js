import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TripList from '../trip/TripList';
import useColors from '../themes/colors';

const Tab = createMaterialTopTabNavigator();

function TripsListScreen() {
  const colors = useColors();

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12 },
        tabStyle: { width: 100 },
        style: {
          backgroundColor: colors.primary
        },
        indicatorStyle: {
          backgroundColor: colors.textTitle
        }
      }}
    >
      <Tab.Screen name="à venir" style={{ backgroundColor: colors.primary }}>
        {() => <TripList trips={[1]} />}
      </Tab.Screen>
      <Tab.Screen name="passés" style={{ backgroundColor: colors.primary }}>
        {() => <TripList trips={[1]} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TripsListScreen;
